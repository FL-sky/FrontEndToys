export function getAudioPath (topic) {
  let path = topic.topicContent.wordAudioURL.replace(/^\/?resources\//, topic.resourcesPath);
  path = path.replace(/_dat/g, '');
  path = path.replace(/.dat/g, '.mp3');
  return path;
}
