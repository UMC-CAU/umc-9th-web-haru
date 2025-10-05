import { useParams } from 'react-router-dom';

// 함수형 컴포넌트로 정의하고 'export default'로 내보냅니다.
export default function MovieDetailPage() {
    // URL에서 movieId를 가져옵니다. (나중에 API 호출에 사용)
    const { movieId } = useParams<{ movieId: string }>();

    return (
        <div className="p-10 text-center">
            {/* 임시로 어떤 영화를 보는지 표시 */}
            <h1 className="text-2xl font-bold">
                Movie Detail Page
            </h1>
            <p className="text-gray-500 mt-2">
                Current Selcted Movie ID: {movieId}
            </p>
            {/* 여기에 영화 상세 정보를 가져와 렌더링하는 코드가 들어갈 예정 */}
        </div>
    );
}