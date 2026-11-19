/**
 * 모바일 청첩장 설정 파일 (CONFIG)
 * 
 * 신랑, 신부님의 정보와 예식 일시, 장소, 계좌번호 등을 이곳에서 자유롭게 수정하실 수 있습니다.
 */

const WEDDING_CONFIG = {
  // 1. 신랑 & 신부 기본 정보
  groom: {
    name: "진경민",
    englishName: "Kyungmin Jin",
    phone: "010-1234-5678",
    relation: "장남",
    father: {
      name: "진구영",
      phone: "010-2345-6789",
      alive: true
    },
    mother: {
      name: "이현실",
      phone: "010-3456-7890",
      alive: true
    },
    account: {
      bank: "국민은행",
      number: "123-456789-01-012",
      holder: "진경민"
    },
    parentAccounts: [
      {
        relation: "아버지",
        name: "진구영",
        bank: "신한은행",
        number: "110-123-456789",
        holder: "진구영"
      },
      {
        relation: "어머니",
        name: "이현실",
        bank: "우리은행",
        number: "1002-123-456789",
        holder: "이현실"
      }
    ]
  },

  bride: {
    name: "박소현",
    englishName: "Sohyeon Park",
    phone: "010-8765-4321",
    relation: "장녀",
    father: {
      name: "박노재",
      phone: "010-9876-5432",
      alive: true
    },
    mother: {
      name: "이혜원",
      phone: "010-8901-2345",
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
      },
      {
        relation: "어머니",
        name: "이혜원",
        bank: "농협은행",
        number: "352-1234-5678-91",
        holder: "이혜원"
      }
    ]
  },

  // 2. 예식 일시 (2027.02.28 일요일 오전 11시)
  weddingDate: {
    year: 2027,
    month: 2,        // 1 ~ 12
    day: 28,
    dayOfWeek: "일요일",
    time: "오전 11시",
    isoString: "2027-02-28T11:00:00+09:00" // D-Day 카운트다운 기준 시각
  },

  // 3. 예식 장소 정보 (더화이트베일)
  venue: {
    name: "더화이트베일 (THE WHITE VEIL)",
    hall: "웨딩홀",
    address: "서울특별시 서초구 서초중앙로 14",
    addressDetail: "(서초동 1445-14)",
    tel: "02-3474-5000",
    coordinates: {
      lat: 37.484250,
      lng: 127.016350
    },
    // 네비게이션 바로가기 링크 (모바일 앱 스킴 및 웹 링크 지원)
    naviLinks: {
      kakaoMap: "https://map.kakao.com/link/to/더화이트베일,37.484250,127.016350",
      naverMap: "https://map.naver.com/v5/search/%EB%8D%94%ED%99%94%EC%9D%B4%ED%8A%B8%EB%B2%A0%EC%9D%BC",
      tmap: "tmap://search?name=더화이트베일"
    },
    transport: {
      subway: [
        { line: "지하철 3호선", desc: "남부터미널역 4번 출구 (도보 2~3분)" }
      ],
      bus: [
        { type: "간선버스", desc: "405, 406, 350, 461, 641 (남부터미널 하차)" },
        { type: "지선버스", desc: "4319, 4435, 5413, 8541 (서초동예술의전당 하차)" }
      ],
      parking: "웨딩홀 맞은편 전용 주차타워 이용 (하객 2시간 무료 주차 제공, 약 600대 동시 주차)"
    }
  },

  // 4. 감성 초대 문구
  greeting: {
    title: "소중한 분들을 초대합니다",
    subtitle: "Two are better than one",
    message: `살랑이는 바람이 머무는 계절,
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

  // 6. 대표 메인 커버 사진 지정
  coverImage: "assets/images/opt_HO_00363.jpg",
  coverImageFull: "assets/images/HO_00363.jpg",

  // 7. 추가 안내 문구
  notices: [
    {
      title: "화환 안내",
      content: "축하해주시는 따뜻한 마음만 감사히 받겠습니다. 정중히 화환은 사양하오니 혜량하여 주시기 바랍니다."
    },
    {
      title: "식사 안내",
      content: "정성껏 준비한 연회 식사는 예식 후 연회장에서 진행됩니다."
    }
  ]
};

// 브라우저 전역 객체(window)에 명시적 할당
if (typeof window !== 'undefined') {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
}
