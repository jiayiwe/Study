import { LIMIT } from "../../constant"
import { memo } from "react"

const Pagination = props => {
    const { currentPage, count, onPageClick } = props

    if (count <= LIMIT) {
        return null
    }

    // 12 / 5  3  1
    const pageNum = []
    for (let page = 1; page <= Math.ceil(count / LIMIT); page++) {
        pageNum.push(page)
    }

    return (
        <nav>
            <ul>
                {
                    pageNum.map(pageNum => {
                        const isCurentPage = currentPage === pageNum
                        return (
                            <li key={pageNum} className={isCurentPage ? "page-item active" : "page-item"}>
                                <button
                                    type='button'
                                    className="page-link"
                                    onClick={
                                        () => {
                                            console.log(pageNum)
                                            onPageClick(pageNum)
                                        }
                                    }
                                >
                                    {pageNum}
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default Pagination