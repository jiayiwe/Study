import Item from "./item";
import Pagination from "./Pagination";

const Articles = props => {
    const { currentPage, count, onPageClick, articles, isShowPage } = props

    if (!articles) {
        return <div className='article-preview'>加载中。。。</div>
    }

    if (articles && articles.length === 0) {
        return <div className='article-preview'>没有文章显示</div>
    }

    return (
        <div>
            {
                articles.map(article => {
                    return <Item article={article} key={article.slug} />
                })
            }

            {
                isShowPage ? <Pagination
                    currentPage={currentPage}
                    count={count}
                    onPageClick={onPageClick} /> : null
            }
        </div>
    )
}

export default Articles