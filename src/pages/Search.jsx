import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import BookCard from "../components/BookCard"

const Search = () => {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    const queryParams = searchParams.get("q") || ""

    const [textField, setTextField] = useState(queryParams)

    const [books, setBooks] = useState([])



    useEffect(() => {
        const LoadBooks = async () => {
            const res = await fetch("https://openlibrary.org/search.json" + "?q=" + queryParams + "&liit=20")
            const data = await res.json()
            console.log(data)
            setBooks(data.docs)
        }
        LoadBooks()
    }, [queryParams])
    const handleSubmit = (e) => {
        e.preventDefault()
        if (textField.trim() === "") return
        navigate('/search?q=' + encodeURIComponent(textField.trim()))
    }

    return (
        <section className="content">
            <div className="search-page-header">
                <div className="section-label">ПОИСК</div>
                <h1>Найдите свою следующую книгу</h1>
                <form onSubmit={handleSubmit} className="search" id="searchForm">
                    <span className="search-icon">⌕</span>
                    <input
                        value={textField}
                        onChange={(e) => setTextField(e.target.value)}
                        id="searchInput"
                        type="text"
                        placeholder="Название, автор или ISBN..."
                    />
                    <button type="submit">Найти</button>
                </form>
            </div>
            <div className="section-header">
                <div>
                    <div className="section-label">РЕЗУЛЬТАТЫ</div>
                    <h2 id="searchTitle">Результаты поиска</h2>
                </div>
                <span className="result-count" id="resultCount">
                    —
                </span>
            </div>
            <div className="book-grid" id="results">
                {books.map((e) => (<BookCard />))}
            </div>
        </section>
    )
}

export default Search
