import "./VideoPage.scss";
const VideoPage = () => {
    const handleNavigate = (path: string) => {
        if (path === 'video1') window.location.href = 'https://www.youtube.com/watch?v=2jiPNhPqydg'
        if (path === 'video2') window.location.href = 'https://www.youtube.com/watch?v=67B9RPoItW8'

    }
    return (
        <div className="video-page_container">
            <div className="video-page_title">Video phân biệt các âm đọc của chữ</div>
            <div className="video-page_content">
                <div className="item_video" onClick={() => handleNavigate('video1')}>Học ngay chữ Hán đa âm “给” chỉ với một câu nói???</div>
                <div className="item_video" onClick={() => handleNavigate('video2')}>Học ngay chữ Hán đa âm “为” chỉ với một câu nói???</div>
            </div>
        </div>
    );
};

export default VideoPage;