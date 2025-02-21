<script>
	import SLAbar from "./SLAbar.svelte";
    let isVisible = true;
	export let IRIStime;
	export let alertStatusID;
</script>

<div class="grid-gap">
		<div style:display={isVisible ? 'block' : 'none'}>
			<SLAbar {IRIStime} {alertStatusID}/>
		</div>
</div>