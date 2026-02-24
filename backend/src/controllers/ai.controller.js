import Progress from "../models/Progress.js";
import { recommendContent } from "../services/recommendation.service.js";
import { predictRisk } from "../services/riskPrediction.service.js";

export const analyzeLearner = async (req, res) => {
  const progress = await Progress.findOne({ userId: req.user.id });

  if (!progress) {
    return res.status(404).json({
      message: "No progress data found for this learner"
    });
  }

  const recommendation = recommendContent(progress);
  const risk = predictRisk(progress);

  res.json({ recommendation, risk });
};
