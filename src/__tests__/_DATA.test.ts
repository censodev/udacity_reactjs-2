import { _saveQuestion, _saveQuestionAnswer } from "../../_DATA";

describe('_saveQuestion', () => {
  it('should return the saved question when correctly formatted data is passed', async () => {
    const questionData = {
      optionOneText: 'Option One Text',
      optionTwoText: 'Option Two Text',
      author: 'sarahedo',
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
    await expect(_saveQuestion(incorrectQuestionData)).rejects.toBeDefined();
  });
});

describe('_saveQuestionAnswer', () => {
  test('returns true for correct data', async () => {
    const authedUser = 'sarahedo';
    const qid = 'vthrdm985a262al8qx3do';
    const answer = 'optionOne';

    const result = await _saveQuestionAnswer({ authedUser, qid, answer });

    expect(result).toBe(true);
    expect(result).toMatchSnapshot();
  });

  test('rejects with an error for incorrect data', async () => {
    const authedUser = '';
    const qid = '';
    const answer = 'optionOne';

    await expect(_saveQuestionAnswer({ authedUser, qid, answer })).rejects.toBeDefined();
  });
});
