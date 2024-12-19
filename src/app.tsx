import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function App() {
	return (
		<>
			<CssBaseline />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<RouterProvider router={router} />
		</>
	)
}
