import Header from './components/Header'
import ImageConverter from './components/ImageConverter'

function App() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <Header />
        <ImageConverter />
      </div>
    </main>
  )
}

export default App