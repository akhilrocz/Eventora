import { StrictMode } from "react"
import { AuthProvider } from "./context/AuthContext"
const App = () => {
  return (
    <StrictMode>
      <AuthProvider>
        <div>App</div>
      </AuthProvider>
    </StrictMode>
  )
}

export default App