<script>
	import SLAbar from "./SLAbar.svelte";

    let isVisible = true;
</script>

<div class="grid-gap">
		<div style:display={isVisible ? 'block' : 'none'}>
			<SLAbar/>
		</div>
</div>