import './cardWord.scss'
type CardWordProps = {
    props: {
        word: any;
    };
    onClick?: () => void;
};

const CardWord = ({ props, onClick }: CardWordProps) => {
    return (
        <div className="card-word_container" onClick={onClick}>
            <div className="word">{props?.word}</div>
        </div>
    )
}

export default CardWord
