export default class StopWatch{
    constructor(clock){
        this.clock = clock;
        // this.clock = true;
        this.hour = 0o00;
        this.minute = 0o00;
        this.second = 0o00;
        this.count = 0o00;

    };

    runStopWatch(hr, min, sec, count){
        if (this.clock) {
            this.count++;
      
            if (this.count == 100) {
                this.second++;
                this.count = 0;
            }
      
            if (this.second == 60) {
                this.minute++;
                this.second = 0;
            }
      
            if (this.minute == 60) {
                this.hour++;
                this.minute = 0;
                this.second = 0;
            }
      
            let hrString = this.hour;
            let minString = this.minute;
            let secString = this.second;
            let countString = this.count;
      
            if (this.hour < 10) {
                hrString = "0" + hrString;
            }
      
            if (this.minute < 10) {
                minString = "0" + minString;
            }
      
            if (this.second < 10) {
                secString = "0" + secString;
            }
      
            if (this.count < 10) {
                countString = "0" + countString;
            }
            // console.log(hr)

            // hr.innerHTML = hrString;
            // min.innerHTML = minString;
            // sec.innerHTML = secString;
            // count.innerHTML = countString;

      
            document.getElementById('hr').innerHTML = hrString;
            document.getElementById('min').innerHTML = minString;
            document.getElementById('sec').innerHTML = secString;
            document.getElementById('count').innerHTML = countString;
            setTimeout(this.runStopWatch, 10);
        }
    }
}