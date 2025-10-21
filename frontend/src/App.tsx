import RegisterForm from "./components/LoginForm";
import "./index.css"; // Onde colocaremos os estilos globais

function App() {
  return (
    <div className="app-container">
      {/* O nosso container CSS para centralização */}
      <div className="main-content">
        <RegisterForm />
      </div>
    </div>
  );
}

export default App;
