import App from './SLAcontainer.svelte';

export let app; // Declare at the top level

document.addEventListener('alertRendered', () => {
  console.log('alertRendered event received');
  const containers = document.querySelectorAll('.SLAcontainer');
  console.log(containers);
  if (containers) {
    containers.forEach((container) => {
      app = new App({target: container});
      console.log('Svelte component mounted:', app);
    });
  }
});
