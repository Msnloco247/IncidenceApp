import { Media, MediaObject } from '@awesome-cordova-plugins/media';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

class AudioService {
  private media: MediaObject | null = null;
  private filePath: string = '';

  constructor() {}

  async startRecording() {
    this.filePath = await this.getFilePath();
    this.media = Media.create(this.filePath);
    this.media.startRecord();
  }

  stopRecording(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.media) {
        this.media.stopRecord();
        this.media.release();
        resolve(this.filePath);
      } else {
        reject('No media object found');
      }
    });
  }

  playAudio(filePath: string) {
    this.media = Media.create(filePath);
    this.media.play();
  }

  stopAudio() {
    if (this.media) {
      this.media.stop();
      this.media.release();
    }
  }

  private  async getFilePath(): Promise<string> {
    const fileName = `record_${new Date().getTime()}.mp3`;
    return  await Filesystem.getUri({
      directory:  Directory.Documents,
      path: fileName,
    }).then(result => result.uri);
  }
}

const audioService = new AudioService();
export default audioService;
