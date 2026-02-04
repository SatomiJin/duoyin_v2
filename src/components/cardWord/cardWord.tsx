import './cardWord.scss'
const CardWord = ({ props }: { props: any }) => {
    return (
        <div className="card-word_container">
            <div className="word">{props?.word}</div>
        </div>
    )
}

export default CardWord
