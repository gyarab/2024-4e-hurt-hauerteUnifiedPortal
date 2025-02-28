<script>
	import SLAbar from "./SLAbar.svelte";
    let isVisible = true;
	export let IRIStime;
	export let alertStatusID;
	export let alertSevID;
	export let alertCustomerID;
	export let SLA;

	console.log("SLA FROM SLACOntainer", SLA);

</script>

<div class="grid-gap">
		<div style:display={isVisible ? 'block' : 'none'}>
			<SLAbar {IRIStime} {alertStatusID} {alertSevID} {SLA} {alertCustomerID}/>
		</div>
</div>