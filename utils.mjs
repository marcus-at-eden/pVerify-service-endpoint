// Levenshtein distance function
export function getLevenshteinDistance(a, b) {
  const tmp = [];
  let i,
    j,
    alen = a.length,
    blen = b.length,
    cost;
  if (alen === 0) {
    return blen;
  }
  if (blen === 0) {
    return alen;
  }

  // Initialize the matrix
  for (i = 0; i <= alen; i++) {
    tmp[i] = [i];
  }
  for (j = 0; j <= blen; j++) {
    tmp[0][j] = j;
  }

  // Populate the matrix
  for (i = 1; i <= alen; i++) {
    for (j = 1; j <= blen; j++) {
      cost = a[i - 1] === b[j - 1] ? 0 : 1;
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + cost
      );
    }
  }
  return tmp[alen][blen];
}

// Normalize Levenshtein distance by length of strings
export function normalizedLevenshteinDistance(input, target) {
  const distance = getLevenshteinDistance(
    input.toLowerCase(),
    target.toLowerCase()
  );
  const maxLength = Math.max(input.length, target.length);
  return distance / maxLength; // Normalize based on longest string
}

// Get substring matching
export function substringMatch(input, target) {
  const normalizedInput = input.toLowerCase();
  const normalizedTarget = target.toLowerCase();
  return normalizedTarget.includes(normalizedInput);
}

// Find the closest match based on fuzzy search with Levenshtein distance
export function findPayer(input, payers) {
  let bestMatch = null;
  let bestScore = Infinity;

  payers.forEach((payer) => {
    const payerName = payer.Payer_Name;
    let score = 1.0; // Default score (1 is bad match, lower is better)

    // Substring match for exact phrase or phrase inside (exact part match, e.g. "Tricare" in "Tricare West")
    if (substringMatch(input, payerName)) {
      score *= 0.5; // Adjust score for better substring matches

      // Then check the Levenshtein distance for further fine-tuning
      const levenshteinScore = normalizedLevenshteinDistance(input, payerName);
      score += levenshteinScore;
    }

    // If this score is better, update the best match
    if (score < bestScore) {
      bestScore = score;
      bestMatch = payer;
      //console.log(score + ' - ' + payer.Payer_Name);
    }
  });

  if (bestMatch) {
    //console.log('Best guess = ' + bestMatch.Payer_Name);
    return `${bestMatch.Payer_Code}`;
  }

  return "0";
}