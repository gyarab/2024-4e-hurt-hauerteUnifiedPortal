import App from './SLAcontainer.svelte';

export let app; // Declare at the top level

document.addEventListener('alertRendered', () => {
  console.log('alertRendered event received');
  const container = document.getElementById('SLAcontainer');
  console.log(container);
  if (container) {
    app = new App({ target: container });
    console.log('Svelte component mounted:', app);
  }
});
