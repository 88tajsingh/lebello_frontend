import { createApp } from './main'

async function mountApp() {
  const { app, router } = createApp()
  
  const initialData = window.__EXTRA_DATA__
    // console.log('initialData', window.__EXTRA_DATA__)
  if (initialData) {
    app.config.globalProperties.$initialData = initialData
  }

  await router.isReady()
  
  // Mount the app
  const container = document.getElementById('app')
  app.mount(container)
  
  // console.log('Client-side hydration completed')
}

// Handle any errors during mounting
mountApp().catch((error) => {
  console.error('Error during client-side hydration:', error)
})