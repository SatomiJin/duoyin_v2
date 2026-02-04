import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './FeaturesCard.scss'
const FeaturesCard = ({ props }: { props: any }) => {
    const { containerRef, isVisible } = useIntersectionObserver({ threshold: 0.5 });

    const animationClass = props.align === 'right' ? 'slide-from-left' : 'slide-from-right';

    return (
        <div
            className={`card_container ${animationClass} ${isVisible ? 'is-visible' : ''}`}
            ref={containerRef}
        >
            <div className='card_container_pc'>
                <div className='card_title'>{props.title} ({props.titleCn})</div>
                <div className={`card_content row ${props.align === 'right' ? 'reverse' : ''}`}>
                    <img className={`card_img col-lg-4 col-md-4`} src={props.imageKey} alt={props.title} />
                    <div className='card_desc col-lg-8 col-md-8'>{props.content}</div>
                </div>
            </div>

            <div className='card_container_mobile'>
                <img className='card_img' src={props.imageKey} alt={props.title} />
                <div className='card_content'>
                    <div className='title'>{props.title} ({props.titleCn})</div>
                    <div className='desc'>{props.content}</div>
                </div>
            </div>
        </div >
    )
}

export default FeaturesCard;