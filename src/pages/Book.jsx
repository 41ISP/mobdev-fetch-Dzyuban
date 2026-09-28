import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Loader from '../components/Loader'

const Book = () => {

    // стэйты
    const { id } = useParams()

    const [book, setBook] = useState(undefined)

    const [error, setError] = useState(null)

    const [isLoading, setIsLoading] = useState(false)
    // стэйты
    
    useEffect(() => {
        const LoadBooks = async () => {
            try {
            setIsLoading(true)
            const res = await fetch("https://openlibrary.org/works/" + id + ".json")
            
            if (!res.ok) {
                const errorData = await res.json()

                throw new Error("что то пошло не так",)
            }

            const data = await res.json()
            

            ///////////////////////////////////////////////////////////////////
            if (data.authors[0].author.key) 
                {const authorRes = await fetch("https://openlibrary.org" + data.authors[0].author.key + ".json", )
            
                const authorDate = await authorRes.json()
                data.author = authorDate.name
            }

////////////////////////////////////////////////////
            setBook(data)
            
        } catch (error) {
            console.error(error)
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
        }
        LoadBooks()
    }, [id])
    if (isLoading) return <Loader />

    if (!isLoading && error) return <p>{error}</p>

    if (book) return (
        <section className="book-page">
            <div className="book-page-cover">
                <img
                    id="bookCover"
                    src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                    alt=""
                />
            </div>
            <div className="book-page-content">
                <div className="section-label">КНИГА</div>
                <h1 id="bookTitle">{book.title}</h1>
                <div className="book-page-author" id="bookAuthor">
                    {book.author}
                </div>
                <div className="book-meta">
                    <span id="bookYear">{book.first_publish_date}</span>
                    <span>Fiction</span>
                </div>
                {book?.description?.value &&
                    <div className="description">
                    <h3>Об этой книге</h3>
                    <p id="bookDescription">
                        {book.description.value}
                    </p>
                </div>
                }
                
                <div className="modal-actions">
                    <button className="primary-button">Читать</button>
                    <button className="secondary-button">♡ Сохранить</button>
                </div>
            </div>
        </section>
    )
}

export default Book
