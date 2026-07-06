/*
 * VibeCoder Lab — 로컬 QR 코드 인코더 (외부 서버 의존 없음)
 * 바이트 모드, 오류정정 M, 버전(1~40) 자동 선택. 전역 함수 drawQr(canvas, text)만 노출한다.
 * 완료율 코드(교사 수합용)를 학생 기기 밖으로 전송하지 않기 위해 도입했다.
 */
(function (global) {
  "use strict";

  const EC_M = 1; // 0=L 1=M 2=Q 3=H (indices into per-version tables below)

  // 버전별 { 총 데이터 코드워드, EC 코드워드/블록, 블록 그룹 정의 } — EC level M만 필요하므로 M만 수록.
  // [totalCodewords, ecCodewordsPerBlock, numBlocksGroup1, blockLenGroup1, numBlocksGroup2, blockLenGroup2]
  const VERSION_INFO_M = [
    null,
    [16,10,1,16,0,0], [28,16,1,28,0,0], [44,26,1,44,0,0], [64,18,2,32,0,0],
    [86,24,2,43,0,0], [108,16,4,27,0,0], [124,18,4,31,0,0], [154,22,2,38,2,39],
    [182,22,3,36,2,37], [216,26,4,43,1,44], [254,30,1,50,4,51], [290,22,6,36,2,37],
    [334,22,8,37,1,38], [365,24,4,40,5,41], [415,24,5,41,5,42], [453,28,7,45,3,46],
    [507,28,10,46,1,47], [563,26,9,43,4,44], [627,26,3,44,11,45], [669,26,3,41,13,42],
    [714,26,17,42,0,0], [782,28,17,46,0,0], [860,28,4,47,14,48], [914,28,6,45,14,46],
    [1000,28,8,47,13,48], [1062,28,19,46,4,47], [1128,28,22,45,3,46], [1193,28,3,45,23,46],
    [1267,28,21,45,7,46], [1373,28,19,47,10,48], [1455,28,2,46,29,47], [1541,28,10,46,23,47],
    [1631,28,14,46,21,47], [1725,28,14,46,23,47], [1812,28,12,47,26,48], [1914,28,6,47,34,48],
    [1992,28,29,46,14,47], [2102,28,13,46,32,47], [2216,28,40,47,7,48], [2334,28,18,47,31,48]
  ];
  const ALIGN_POS = [
    null, [], [6,18], [6,22], [6,26], [6,30], [6,34], [6,22,38], [6,24,42], [6,26,46], [6,28,50],
    [6,30,54], [6,32,58], [6,34,62], [6,26,46,66], [6,26,48,70], [6,26,50,74], [6,30,54,78], [6,30,56,82],
    [6,30,58,86], [6,34,62,90], [6,28,50,72,94], [6,26,50,74,98], [6,30,54,78,102], [6,28,54,80,106],
    [6,32,58,84,110], [6,30,58,86,114], [6,34,62,90,118], [6,26,50,74,98,122], [6,30,54,78,102,126],
    [6,26,52,78,104,130], [6,30,56,82,108,134], [6,34,60,86,112,138], [6,30,58,86,114,142], [6,34,62,90,118,146],
    [6,30,54,78,102,126,150], [6,24,50,76,102,128,154], [6,28,54,80,106,132,158], [6,32,58,84,110,136,162],
    [6,26,54,82,110,138,166], [6,30,58,86,114,142,170]
  ];

  // GF(256) 로그/역로그 테이블 (Reed-Solomon 오류정정용)
  const GF_EXP = new Uint8Array(512), GF_LOG = new Uint8Array(256);
  (function initGF() {
    let x = 1;
    for (let i = 0; i < 255; i++) {
      GF_EXP[i] = x; GF_LOG[x] = i;
      x <<= 1; if (x & 0x100) x ^= 0x11d;
    }
    for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255];
  })();
  function gfMul(a, b) { return (a === 0 || b === 0) ? 0 : GF_EXP[GF_LOG[a] + GF_LOG[b]]; }

  function rsGeneratorPoly(degree) {
    let poly = [1];
    for (let i = 0; i < degree; i++) {
      const next = new Array(poly.length + 1).fill(0);
      for (let j = 0; j < poly.length; j++) {
        next[j] ^= gfMul(poly[j], GF_EXP[i]);
        next[j + 1] ^= poly[j];
      }
      poly = next;
    }
    return poly.reverse(); // poly[0]=선행계수(항상 1) 순서로 맞춘다(rsEncode가 기대하는 순서)
  }
  function rsEncode(data, ecLen) {
    const gen = rsGeneratorPoly(ecLen);
    const res = new Array(ecLen).fill(0);
    for (const b of data) {
      const factor = b ^ res[0];
      res.shift(); res.push(0);
      for (let i = 0; i < ecLen; i++) res[i] ^= gfMul(gen[i + 1] || 0, factor);
    }
    return res;
  }

  function chooseVersion(byteLen) {
    for (let v = 1; v <= 40; v++) {
      const info = VERSION_INFO_M[v];
      if (!info) continue;
      const dataCap = info[0] - (info[2] * info[3] + info[4] * info[5]) * 0 + 0;
      // 데이터 용량(바이트) = 총 코드워드 - 헤더(모드4비트+길이필드)는 아래 buildDataCodewords에서 처리하므로
      // 여기서는 총 데이터 코드워드 용량만 비교(근사 후 실제 인코딩에서 검증).
      const totalDataCodewords = info[2] * info[3] + info[4] * info[5];
      const lenBits = v <= 9 ? 8 : 16;
      const headerBits = 4 + lenBits;
      const capacityBits = totalDataCodewords * 8 - headerBits;
      if (Math.floor(capacityBits / 8) >= byteLen) return v;
    }
    throw new Error("텍스트가 너무 깁니다(QR 버전 40 초과).");
  }

  function buildDataCodewords(bytes, version) {
    const info = VERSION_INFO_M[version];
    const totalDataCodewords = info[2] * info[3] + info[4] * info[5];
    const lenBits = version <= 9 ? 8 : 16;
    const bits = [];
    const pushBits = (val, n) => { for (let i = n - 1; i >= 0; i--) bits.push((val >> i) & 1); };
    pushBits(0b0100, 4); // バイト mode indicator
    pushBits(bytes.length, lenBits);
    for (const b of bytes) pushBits(b, 8);
    const capacityBits = totalDataCodewords * 8;
    // terminator
    for (let i = 0; i < 4 && bits.length < capacityBits; i++) bits.push(0);
    while (bits.length % 8 !== 0) bits.push(0);
    const codewords = [];
    for (let i = 0; i < bits.length; i += 8) {
      let byte = 0;
      for (let j = 0; j < 8; j++) byte = (byte << 1) | bits[i + j];
      codewords.push(byte);
    }
    const pads = [0xec, 0x11];
    let pi = 0;
    while (codewords.length < totalDataCodewords) codewords.push(pads[pi++ % 2]);
    return codewords;
  }

  function interleave(dataCodewords, version) {
    const info = VERSION_INFO_M[version];
    const [, ecLen, nb1, len1, nb2, len2] = info;
    const blocks = [];
    let offset = 0;
    for (let i = 0; i < nb1; i++) { blocks.push(dataCodewords.slice(offset, offset + len1)); offset += len1; }
    for (let i = 0; i < nb2; i++) { blocks.push(dataCodewords.slice(offset, offset + len2)); offset += len2; }
    const ecBlocks = blocks.map((blk) => rsEncode(blk, ecLen));
    const maxLen = Math.max(len1, len2 || 0);
    const result = [];
    for (let i = 0; i < maxLen; i++) {
      for (const blk of blocks) if (i < blk.length) result.push(blk[i]);
    }
    for (let i = 0; i < ecLen; i++) {
      for (const ec of ecBlocks) result.push(ec[i]);
    }
    return result;
  }

  function buildMatrix(version, codewords) {
    const size = version * 4 + 17;
    const matrix = Array.from({ length: size }, () => new Array(size).fill(null));
    const isFunction = Array.from({ length: size }, () => new Array(size).fill(false));

    function setFn(r, c, val) { matrix[r][c] = val; isFunction[r][c] = true; }
    function placeFinder(r, c) {
      for (let dr = -1; dr <= 7; dr++) for (let dc = -1; dc <= 7; dc++) {
        const rr = r + dr, cc = c + dc;
        if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
        const isBorder = dr === -1 || dr === 7 || dc === -1 || dc === 7;
        const isRing = (dr >= 0 && dr <= 6 && (dc === 0 || dc === 6)) || (dc >= 0 && dc <= 6 && (dr === 0 || dr === 6));
        const isCore = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
        setFn(rr, cc, isBorder ? 0 : (isRing || isCore) ? 1 : 0);
      }
    }
    placeFinder(0, 0); placeFinder(0, size - 7); placeFinder(size - 7, 0);

    // timing patterns
    for (let i = 8; i < size - 8; i++) {
      if (!isFunction[6][i]) setFn(6, i, i % 2 === 0 ? 1 : 0);
      if (!isFunction[i][6]) setFn(i, 6, i % 2 === 0 ? 1 : 0);
    }

    // alignment patterns
    const aligns = ALIGN_POS[version] || [];
    for (const r of aligns) for (const c of aligns) {
      if ((r === 6 && c === 6) || (r === 6 && c === size - 7) || (r === size - 7 && c === 6)) continue;
      for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) {
        const isBorder = dr === -2 || dr === 2 || dc === -2 || dc === 2;
        setFn(r + dr, c + dc, isBorder || (dr === 0 && dc === 0) ? 1 : 0);
      }
    }

    // dark module
    setFn(size - 8, 8, 1);

    // reserve format info areas
    for (let i = 0; i < 9; i++) {
      if (!isFunction[8][i]) setFn(8, i, 0);
      if (!isFunction[i][8]) setFn(i, 8, 0);
    }
    for (let i = 0; i < 8; i++) {
      if (!isFunction[8][size - 1 - i]) setFn(8, size - 1 - i, 0);
      if (!isFunction[size - 1 - i][8]) setFn(size - 1 - i, 8, 0);
    }

    // reserve version info areas (version >= 7)
    if (version >= 7) {
      for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) {
        setFn(size - 11 + j, i, 0);
        setFn(i, size - 11 + j, 0);
      }
    }

    // place data bits in zigzag, skipping function modules
    const bitStream = [];
    for (const byte of codewords) for (let i = 7; i >= 0; i--) bitStream.push((byte >> i) & 1);
    let bitIdx = 0;
    let upward = true;
    for (let col = size - 1; col > 0; col -= 2) {
      if (col === 6) col--;
      for (let rowStep = 0; rowStep < size; rowStep++) {
        const row = upward ? size - 1 - rowStep : rowStep;
        for (const c of [col, col - 1]) {
          if (isFunction[row][c]) continue;
          const bit = bitIdx < bitStream.length ? bitStream[bitIdx++] : 0;
          matrix[row][c] = bit;
        }
      }
      upward = !upward;
    }

    // mask selection: try all 8, pick lowest penalty (simplified penalty scoring)
    function applyMask(maskFn) {
      const out = matrix.map((row, r) => row.map((v, c) => {
        if (isFunction[r][c]) return v;
        return v ^ (maskFn(r, c) ? 1 : 0);
      }));
      return out;
    }
    const maskFns = [
      (r, c) => (r + c) % 2 === 0,
      (r) => r % 2 === 0,
      (r, c) => c % 3 === 0,
      (r, c) => (r + c) % 3 === 0,
      (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
      (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
      (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
      (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0
    ];
    function penalty(m) {
      let score = 0;
      const n = m.length;
      // rule 1: runs
      for (let r = 0; r < n; r++) {
        let runColor = m[r][0], runLen = 1;
        for (let c = 1; c < n; c++) {
          if (m[r][c] === runColor) { runLen++; } else { if (runLen >= 5) score += 3 + (runLen - 5); runColor = m[r][c]; runLen = 1; }
        }
        if (runLen >= 5) score += 3 + (runLen - 5);
      }
      for (let c = 0; c < n; c++) {
        let runColor = m[0][c], runLen = 1;
        for (let r = 1; r < n; r++) {
          if (m[r][c] === runColor) { runLen++; } else { if (runLen >= 5) score += 3 + (runLen - 5); runColor = m[r][c]; runLen = 1; }
        }
        if (runLen >= 5) score += 3 + (runLen - 5);
      }
      // rule 2: 2x2 blocks
      for (let r = 0; r < n - 1; r++) for (let c = 0; c < n - 1; c++) {
        const v = m[r][c];
        if (v === m[r][c+1] && v === m[r+1][c] && v === m[r+1][c+1]) score += 3;
      }
      // rule 4: balance
      let dark = 0;
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) dark += m[r][c];
      const pct = (dark * 100) / (n * n);
      score += Math.floor(Math.abs(pct - 50) / 5) * 10;
      return score;
    }
    let best = null, bestScore = Infinity, bestMaskIdx = 0;
    for (let mi = 0; mi < maskFns.length; mi++) {
      const candidate = applyMask(maskFns[mi]);
      const s = penalty(candidate);
      if (s < bestScore) { bestScore = s; best = candidate; bestMaskIdx = mi; }
    }

    // write format info (EC level M = 00, mask bestMaskIdx) using BCH(15,5)
    const FORMAT_EC_BITS = { 0: 1, 1: 0, 2: 3, 3: 2 }; // L,M,Q,H -> bit pattern per spec (M=00)
    const fmtData = (FORMAT_EC_BITS[EC_M] << 3) | bestMaskIdx;
    let fmtBits = fmtData << 10;
    const G15 = 0b10100110111;
    let fmtDup = fmtBits;
    for (let i = 4; i >= 0; i--) if (fmtDup & (1 << (i + 10))) fmtDup ^= G15 << i;
    let fmtVal = ((fmtData << 10) | fmtDup) ^ 0b101010000010010;
    const fmtBitsArr = [];
    for (let i = 14; i >= 0; i--) fmtBitsArr.push((fmtVal >> i) & 1);
    const fmtPositionsA = [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,7],[8,8],[7,8],[5,8],[4,8],[3,8],[2,8],[1,8],[0,8]];
    for (let i = 0; i < 15; i++) { const [r,c] = fmtPositionsA[i]; best[r][c] = fmtBitsArr[i]; }
    const fmtPositionsB = [];
    for (let i = 0; i < 7; i++) fmtPositionsB.push([size - 1 - i, 8]); // bit14..8 (dark module 제외)
    for (let i = 0; i < 8; i++) fmtPositionsB.push([8, size - 8 + i]); // bit7..0
    for (let i = 0; i < 15; i++) { const [r,c] = fmtPositionsB[i]; best[r][c] = fmtBitsArr[i]; }

    // 버전 정보 블록(6x3 + 3x6, version 7 이상)에 BCH(18,6) 부호 기록 — XOR 마스크 없음.
    if (version >= 7) {
      const V_GEN = 0b1111100100101; // degree 12
      let verRem = version << 12;
      for (let i = 5; i >= 0; i--) if (verRem & (1 << (i + 12))) verRem ^= V_GEN << i;
      const verVal = (version << 12) | verRem;
      for (let i = 0; i < 18; i++) {
        const bit = (verVal >> i) & 1;
        const a = size - 11 + (i % 3);
        const b = Math.floor(i / 3);
        best[a][b] = bit;
        best[b][a] = bit;
      }
    }

    return best;
  }

  function encodeQrMatrix(text) {
    const bytes = Array.from(new TextEncoder().encode(text));
    const version = chooseVersion(bytes.length);
    const dataCodewords = buildDataCodewords(bytes, version);
    const allCodewords = interleave(dataCodewords, version);
    return buildMatrix(version, allCodewords);
  }

  function drawQr(canvas, text, opts) {
    const options = opts || {};
    const scale = options.scale || 6;
    const margin = options.margin ?? 4;
    const matrix = encodeQrMatrix(String(text || ""));
    const size = matrix.length;
    const px = (size + margin * 2) * scale;
    canvas.width = px; canvas.height = px;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, px, px);
    ctx.fillStyle = "#111111";
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (matrix[r][c]) ctx.fillRect((c + margin) * scale, (r + margin) * scale, scale, scale);
      }
    }
  }

  global.drawQr = drawQr;
})(window);
