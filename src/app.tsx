import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useLoading } from "./hooks/loading";
import BackdropLoading from "./components/ui/feedback/loading/backdrop";

export default function App() {
	const { isLoading } = useLoading()

	return (
		<>
			{isLoading && <BackdropLoading />}
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
