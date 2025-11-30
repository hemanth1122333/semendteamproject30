import AssessmentTemplate from "./AssessmentTemplate";

function PersonalityTest() {
  return (
    <AssessmentTemplate
      title="Personality Test"
      storageKey="personalityQuestions"
      resultKey="personalityResults"
    />
  );
}

export default PersonalityTest;
