

<script lang="ts">
import { onDestroy } from 'svelte';
  const MyState ={
		NEW: 0,
	  	RUNNING: 1,
	    PAUSED: 2,
  };

  let currstate = MyState.RUNNING;


  //let { startDateTime = "01/02/2025 14:30", endDateTime = "01/02/2025 14:31" } = $props();
  export let startDateTime = "01/02/2025 14:30";
  export let endDateTime = "01/02/2025 14:30";
  let timecomputed = calculateDuration(); //calculate duration betwwen two timestamps in seconds
  //let elapsed = $state(0);
  $: elapsed = 0;
  //let duration = $state(timecomputed);
  $: duration = timecomputed;
  let interval: number
  let oldElapsedTime = 0;
  let currTimeEpoch = 0;
  let startTimeEpoch = getSecondsSinceEpoch(startDateTime);
  //let severity;

  function start() {
	  interval = setInterval(() => {
		  if(currstate === MyState.RUNNING) {

			  //calculate curr time
			  currTimeEpoch = Math.floor((Date.now()) / (1000 * 60)) * 60;
			  //startTimeEpoch = getSecondsSinceEpoch(startDateTime);

				//console.log(currTimeEpoch);
				//console.log(Math.floor((Date.now()) / (1000 * 60)) * 60);
			  elapsed = currTimeEpoch - startTimeEpoch + oldElapsedTime;
			  if (elapsed > duration) {
				  elapsed = duration
				  clearInterval(interval)
			  }
		  }
	  }, 1000)
  }

  function getSecondsSinceEpoch(dateString) {
	  // Split the input string into date and time parts
	  const [datePart, timePart] = dateString.split(' ');

	  // Split the date part into day, month, and year
	  const [day, month, year] = datePart.split('/');

	  // Split the time part into hours and minutes
	  const [hours, minutes] = timePart.split(':');

	  // Create a Date object (note: months are 0-based in JavaScript)
	  const date = new Date(year, month - 1, day, hours, minutes);

	  // Get the number of seconds since the Unix epoch
	  const secondsSinceEpoch = Math.floor(date.getTime() / 1000);

	  return secondsSinceEpoch;
  }


  function complete() {
	  //elapsed = 0
	  clearInterval(interval)
	  //turn the shit green
  }

  function pause() {
	  currstate = MyState.PAUSED;
	  console.log("Paused!");
	  oldElapsedTime = elapsed;
  }

  function resume() {
	  currstate = MyState.RUNNING;
	  startTimeEpoch = (Math.floor((Date.now()) / (1000 * 60)) * 60);
	  console.log("Runing!");
  }

  /*
  $effect(() => {
	  if (!duration) return
	  start()
	  return () => clearInterval(interval)
  })

   */

  let cleanupEffect;

  $: {
    // Call the previous cleanup (if any) before re-running the effect
    if (cleanupEffect) cleanupEffect();

    if (!duration) {
      // No effect is set up if duration is falsy
      cleanupEffect = null;
    }
    else {
      // Execute your effect
      start();
      // Set up the cleanup function
      cleanupEffect = () => clearInterval(interval);
    }
  }

  onDestroy(() => {
    if (cleanupEffect) cleanupEffect();
  });

  function calculateDuration() {
	  try {
		  // Extract date and time components
		  let [date1, time1] = startDateTime.split(" ");
		  let [date2, time2] = endDateTime.split(" ");

		  let [d1, m1, y1] = date1.split("/").map(Number);
		  let [d2, m2, y2] = date2.split("/").map(Number);

		  let [h1, min1] = time1 ? time1.split(":").map(Number) : [0, 0];
		  let [h2, min2] = time2 ? time2.split(":").map(Number) : [0, 0];

		  // Convert to JS Date objects (JS months are 0-based)
		  let start = new Date(y1, m1 - 1, d1, h1, min1);
		  let end = new Date(y2, m2 - 1, d2, h2, min2);
		  let totalTime = 0;

		  // Calculate the difference in milliseconds
		  let diffMs = end - start;

		  if (diffMs < 0) {
			  totalTime = 0;
			  return;
		  }

		  // Convert milliseconds to days, hours, minutes, and seconds
		  let totalSeconds = Math.floor(diffMs / 1000);
		  //let days = Math.floor(totalSeconds / 86400);
		  //let hours = Math.floor((totalSeconds % 86400) / 3600);
            //let minutes = Math.floor((totalSeconds % 3600) / 60);
            //let seconds = totalSeconds % 60;
		  totalTime = totalSeconds;
		  return totalTime;
	  } catch (error) {
		  console.error("Invalid date format:", error);
	  }
  }

    console.log(calculateDuration());
</script>

<div class="grid-gap">
	<div>
      <p>{startDateTime} - {endDateTime}</p>
		<label>
			<span>Elapsed time:</span>
			<progress max={duration} value={elapsed}></progress>
		</label>

		<div>{elapsed.toFixed(1)}s</div>
	</div>

    {#if duration === elapsed}
        <p>SLA breached!</p>
	{/if}
	<button on:click={pause}>Pause</button>
	<button on:click={resume}>Resume</button>
	<button on:click={complete}>Complete</button>
</div>