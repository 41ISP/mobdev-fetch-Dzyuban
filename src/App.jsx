import Book from "./pages/Book"
import Search from "./pages/Search"
import Layout from "./components/Layout"
import { Route, Routes } from "react-router-dom"
import Main from "./pages/Main"



const App = () => {
    return(
    <Routes> 
        <Route path="/" element={<Layout />}>
           <Route index element={<Main />}/>
           <Route path="book/:id" element={<book />} />
           <Route path="search" element={<Search />}/> 
        </Route>
    </Routes>
    ) 
    
}

export default App
