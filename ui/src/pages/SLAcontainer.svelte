<script>
	import SLAbar from "./SLAbar.svelte";

    let isVisible = true;
	export let IRIStime;
</script>

<div class="grid-gap">
		<div style:display={isVisible ? 'block' : 'none'}>
			<SLAbar {IRIStime}/>
		</div>
</div>