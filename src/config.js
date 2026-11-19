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
    relation: "차남",
    father: {
      name: "진태원",
      phone: "010-2345-6789",
      alive: true
    },
    mother: {
      name: "김영희",
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
        name: "진태원",
        bank: "신한은행",
        number: "110-123-456789",
        holder: "진태원"
      },
      {
        relation: "어머니",
        name: "김영희",
        bank: "우리은행",
        number: "1002-123-456789",
        holder: "김영희"
      }
    ]
  },

  bride: {
    name: "이수진",
    englishName: "Sujin Lee",
    phone: "010-8765-4321",
    relation: "장녀",
    father: {
      name: "이정호",
      phone: "010-9876-5432",
      alive: true
    },
    mother: {
      name: "박선영",
      phone: "010-8901-2345",
      alive: true
    },
    account: {
      bank: "카카오뱅크",
      number: "3333-01-9876543",
      holder: "이수진"
    },
    parentAccounts: [
      {
        relation: "아버지",
        name: "이정호",
        bank: "하나은행",
        number: "220-987-654321",
        holder: "이정호"
      },
      {
        relation: "어머니",
        name: "박선영",
        bank: "농협은행",
        number: "352-1234-5678-91",
        holder: "박선영"
      }
    ]
  },

  // 2. 예식 일시
  weddingDate: {
    year: 2027,
    month: 5,        // 1 ~ 12
    day: 22,
    dayOfWeek: "토요일",
    time: "낮 12시 30분",
    isoString: "2027-05-22T12:30:00+09:00" // D-Day 카운트다운 기준 시각
  },

  // 3. 예식 장소 정보
  venue: {
    name: "더 라움 (THE RAUM)",
    hall: "4F 체임버홀",
    address: "서울특별시 강남구 언주로 564",
    addressDetail: "(역삼동 680-1)",
    tel: "02-538-3366",
    coordinates: {
      lat: 37.506520,
      lng: 127.040180
    },
    // 네비게이션 바로가기 링크 (모바일 앱 스킴 및 웹 링크 지원)
    naviLinks: {
      kakaoMap: "https://map.kakao.com/link/to/더라움,37.506520,127.040180",
      naverMap: "https://map.naver.com/v5/search/%EB%8D%94%EB%9D%BC%EC%9B%80",
      tmap: "tmap://search?name=더라움"
    },
    transport: {
      subway: [
        { line: "2호선 / 수인분당선", desc: "선릉역 5번 출구 (도보 7분)" },
        { line: "9호선 / 수인분당선", desc: "선정릉역 4번 출구 (도보 8분)" }
      ],
      bus: [
        { type: "간선버스", desc: "141, 242, 360 (한국조폐공사 정류장 하차)" },
        { type: "지선버스", desc: "3422, 4432 (라움아트센터 앞 하차)" }
      ],
      parking: "라움 전용 지하 주차장 및 지상 주차장 (하객 무료 주차 2시간 30분 지원)"
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
  // 폴더에 있는 사진들을 등록했습니다.
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
      content: "정성껏 준비한 연회 식사는 예식 후 체임버홀 연회장에서 진행됩니다."
    }
  ]
};

export default WEDDING_CONFIG;
