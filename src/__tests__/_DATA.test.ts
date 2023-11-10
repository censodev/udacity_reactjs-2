import { _saveQuestion } from "../../_DATA";

describe('_saveQuestion', () => {
  it('should return the saved question when correctly formatted data is passed', async () => {
    const questionData = {
      optionOneText: 'Option One Text',
      optionTwoText: 'Option Two Text',
      author: 'Phuong Bui',
    };

    const savedQuestion = await _saveQuestion(questionData);

    expect(savedQuestion).toBeDefined();
    expect(savedQuestion.id).toBeDefined();
    expect(savedQuestion.timestamp).toBeDefined();
    expect(savedQuestion.author).toBe(questionData.author);
    expect(savedQuestion.optionOne.text).toBe(questionData.optionOneText);
    expect(savedQuestion.optionTwo.text).toBe(questionData.optionTwoText);
  });

  it('should throw an error if incorrect data is passed', async () => {
    const incorrectQuestionData = {
      optionOneText: '',
      optionTwoText: '',
      author: '',
    };
    _saveQuestion(incorrectQuestionData).then(rs => console.log(rs)
    ).catch(e => console.log(e)
    )
    await expect(_saveQuestion(incorrectQuestionData)).rejects.toThrow();
  });
});