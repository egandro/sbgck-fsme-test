import { msgid2mp3name, cleanHTMLEntities } from './poutils';
import { State } from './statemachine';

export abstract class GameState extends State {
    public static verboseText: boolean = true;
    text(str: string): void {
        const mp3 = msgid2mp3name(str, ']');
        str = cleanHTMLEntities(str);
        if (GameState.verboseText) {
            console.log('   mp3 audio:', mp3, str);
        } else {
            console.log('   mp3 audio:', str);
        }
    }
    randomText(...args: string[]): void {
        const i = Math.floor(Math.random() * args.length);
        this.text(args[i]);
    }
    bgMusic(str: string): void {
        console.log('   looped background music:', str);
    }
    sfx(str: string): void {
        console.log('   sfx:', str);
    }
    stopBgMusic(): void {
        console.log('   background music stopped');
    }
    delay(ms: number): void {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
    }

    hack1 = true;
    calibrateReferenceFrame(): boolean {
        if (this.hack1) {
            this.hack1 = false;
            return false;
        }
        return true;
    }

    hack2 = true;
    detectColorCalibrationCard(): boolean {
        if (this.hack2) {
            this.hack2 = false;
            return false;
        }
        // this.hack2 = false;
        return true;
    }

    hack3 = true;
    queryTokens(param: any): any {
        if (param.timeout) {
            this.delay(param.timeout);
        }

        if (this.hack3) {
            this.hack3 = false;
            return [];
        }
        this.hack3 = true;
        return ['Blue Pentagon'];
    }
}