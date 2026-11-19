/**
 * 모바일 청첩장 설정 파일 (CONFIG)
 */

const WEDDING_CONFIG = {
  // 1. 신랑 & 신부 기본 정보
  groom: {
    name: "진경민",
    englishName: "Kyung-Min",
    phone: "010-3618-5479",
    relation: "장남",
    father: {
      name: "진구영",
      alive: true
    },
    mother: {
      name: "이현실",
      alive: true
    },
    account: {
      bank: "새마을금고",
      number: "9003313544218",
      holder: "진경민"
    },
    parentAccounts: [
      {
        relation: "아버지",
        name: "진구영",
        bank: "신한은행",
        number: "110-123-456789",
        holder: "진구영"
      }
    ]
  },

  bride: {
    name: "박소현",
    englishName: "So-Hyeon",
    phone: "010-2114-0762",
    relation: "장녀",
    father: {
      name: "박노재",
      alive: true
    },
    mother: {
      name: "이혜원",
      alive: true
    },
    account: {
      bank: "카카오뱅크",
      number: "3333-01-9876543",
      holder: "박소현"
    },
    parentAccounts: [
      {
        relation: "아버지",
        name: "박노재",
        bank: "하나은행",
        number: "220-987-654321",
        holder: "박노재"
      }
    ]
  },

  // 2. 예식 일시 (2027.02.28 일요일 오전 11시)
  weddingDate: {
    year: 2027,
    month: 2,
    day: 28,
    dayOfWeek: "일요일",
    time: "오전 11시",
    isoString: "2027-02-28T11:00:00+09:00"
  },

  // 3. 예식 장소 정보 (더화이트베일 4층 W홀)
  venue: {
    name: "더화이트베일",
    englishName: "THE WHITE VEIL",
    hall: "4층 W홀",
    address: "서울특별시 서초구 서초중앙로 14",
    addressDetail: "(서초동 1445-14)",
    tel: "02-3474-5000",
    coordinates: {
      lat: 37.484250,
      lng: 127.016350
    },
    naviLinks: {
      kakaoMap: "https://map.kakao.com/link/to/더화이트베일,37.484250,127.016350",
      naverMap: "https://map.naver.com/v5/search/%EB%8D%94%ED%99%94%EC%9D%B4%ED%8A%B8%EB%B2%A0%EC%9D%BC",
      tmap: "tmap://search?name=더화이트베일"
    },
    transport: {
      subway: "3호선 남부터미널역 4번 출구 (도보 2분)",
      bus: "남부터미널 / 서초동예술의전당 하차",
      parking: "맞은편 전용 주차타워 (2시간 무료 주차, 600대 동시 주차)"
    }
  },

  // 4. 감성 초대 문구 (2월 28일 늦겨울/초봄 감성)
  greeting: {
    title: "소중한 분들을 초대합니다",
    subtitle: "Two are better than one",
    message: `찬란한 겨울의 끝자락,
따스한 봄을 맞이하는 길목에서
서로 다른 길을 걸어오던 저희 두 사람이
이제 같은 곳을 바라보며 하나의 길을 걷고자 합니다.

서로를 아끼고 존중하며
기쁠 때나 슬플 때나 언제나 곁을 지키는
따뜻한 부부가 되겠습니다.

저희의 새로운 시작을 함께 축복해 주시면
더없는 기쁨으로 간직하겠습니다.`
  },

  // 5. 갤러리 사진 목록
  gallery: [
    {
      full: "assets/images/HO_00363.jpg",
      opt: "assets/images/opt_HO_00363.jpg",
      thumb: "assets/images/thumb_HO_00363.jpg",
      alt: "웨딩 화보 1",
      aspect: "portrait"
    },
    {
      full: "assets/images/HO_00462.jpg",
      opt: "assets/images/opt_HO_00462.jpg",
      thumb: "assets/images/thumb_HO_00462.jpg",
      alt: "웨딩 화보 2",
      aspect: "landscape"
    },
    {
      full: "assets/images/HO_01063.jpg",
      opt: "assets/images/opt_HO_01063.jpg",
      thumb: "assets/images/thumb_HO_01063.jpg",
      alt: "웨딩 화보 3",
      aspect: "portrait"
    },
    {
      full: "assets/images/HO_01402.jpg",
      opt: "assets/images/opt_HO_01402.jpg",
      thumb: "assets/images/thumb_HO_01402.jpg",
      alt: "웨딩 화보 4",
      aspect: "landscape"
    },
    {
      full: "assets/images/HO_01438.jpg",
      opt: "assets/images/opt_HO_01438.jpg",
      thumb: "assets/images/thumb_HO_01438.jpg",
      alt: "웨딩 화보 5",
      aspect: "portrait"
    },
    {
      full: "assets/images/HO_01453.jpg",
      opt: "assets/images/opt_HO_01453.jpg",
      thumb: "assets/images/thumb_HO_01453.jpg",
      alt: "웨딩 화보 6",
      aspect: "portrait"
    }
  ],

  coverImage: "assets/images/opt_HO_00363.jpg",
  coverImageFull: "assets/images/HO_00363.jpg"
};

if (typeof window !== 'undefined') {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
}
