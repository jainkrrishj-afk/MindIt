/**
 * Calculates the emotional risk score based on user inputs.
 * 
 * @param {number} moodLevel - Current mood rating (1 = Very Happy, 5 = Very Stressed).
 * @param {number} keywordCount - Number of distress keywords detected in recent text.
 * @param {number} negativeMoodFreq - Number of days with negative mood in the last 7 days.
 * @returns {string} - Risk level: 'Low', 'Moderate', or 'High'.
 */
export const calculateRiskScore = (moodLevel, keywordCount, negativeMoodFreq) => {
  // 1. Define Weights
  // Mood has a significant immediate impact.
  const MOOD_WEIGHT = 2.0; 
  // Distress keywords are strong indicators of immediate danger or crisis.
  const KEYWORD_WEIGHT = 3.5; 
  // Persistent negative mood indicates chronic issues.
  const FREQUENCY_WEIGHT = 1.5;

  // 2. Calculate Weighted Score
  // We assume moodLevel is 1-5, where 5 is highest stress/risk.
  const moodScore = moodLevel * MOOD_WEIGHT;
  const keywordScore = keywordCount * KEYWORD_WEIGHT;
  const frequencyScore = negativeMoodFreq * FREQUENCY_WEIGHT;

  const totalRiskScore = moodScore + keywordScore + frequencyScore;

  // Log for debugging (optional)
  // console.log(`Risk Calc: Mood(${moodScore}) + Keys(${keywordScore}) + Freq(${frequencyScore}) = ${totalRiskScore}`);

  // 3. Determine Risk Level based on Thresholds
  // Thresholds can be tuned based on real-world data or clinical guidelines.
  
  // Example Scenario for High Risk: 
  // Mood 4 (Stressed) * 2 = 8
  // Keywords 2 * 3.5 = 7
  // Freq 4 days * 1.5 = 6
  // Total = 21 -> High

  if (totalRiskScore >= 20) {
    return 'High';
  } else if (totalRiskScore >= 10) {
    return 'Moderate';
  } else {
    return 'Low';
  }
};

export default calculateRiskScore;