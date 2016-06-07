import reqwest from 'reqwest';

const getWordsUrl = 'http://10.10.3.12:3000/study/today_review_game_planning.json';
const sendHasLearnedUrl = 'http://10.10.3.12:3000/study/upload_review_game_learned.json';

export function requestWord (params) {
  reqwest({
    url: getWordsUrl,
    method: 'get',
    crossOrigin: true,
    data: {
      book_id: 10,
      bcz_uid: 1
    },
    success: params.success,
    error: params.error
  });
}

export function sendHasLearned (params) {
  reqwest({
    url: sendHasLearnedUrl,
    method: 'post',
    type: 'json',
    crossOrigin: true,
    data: {
      book_id: 10,
      bcz_uid: 1,
      data_type: 'word',
      ids: params.ids
    },
    success: params.success,
    error: params.error
  });
}
