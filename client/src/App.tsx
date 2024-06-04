import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Clients";
import Projects from "./components/pages/Projects";
import ProjectDetail from "./components/pages/ProjectDetail";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/projects/:clientId/:clientName/:clientEmail" element={<Projects />}></Route>
					<Route path="/project-detail/:project_id/:project_name" element={<ProjectDetail />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
