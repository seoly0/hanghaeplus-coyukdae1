# 총알피하기

## 소개

이 프로젝트는 대회 출전을 위해 작성되었습니다.

[**항해 플러스: 제1회 코육대 출전 프로젝트**](https://hanghaeplus-coyukdae.oopy.io/)

#### 주요 기술

- Target : Web
- Language : Javascript / Typescript
- Scaffolding : Vite
- UI Framework : Vue3
- Graphic Library : Pixi.js
- Deploy : Vercel

#### 주요 기능

- 스플래시 화면
- 게임
  - 난이도 선택
  - 플레이 방법 가이드
- 로컬 점수 기록
- 개발자 정보

#### 플레이 가이드

1. 적이 발사하는 총알을 피해 살아남는 것이 게임의 목적입니다.
2. 게임은 3개의 스테이지로 구성됩니다.
3. 각 스테이지는 60초로 구성되어있으며 시간동안 버티면 다음 스테이지로 넘어갑니다.
4. 적 유형은 총 3가지이며 스테이지가 올라갈 때마다 새로운 적 형태가 추가됩니다.
5. 3스테이지까지 클리어하면 무한모드가 활성화됩니다. 무한모드는 플레이어 캐릭터가 사망할때까지 끝나지 않습니다.

## 배포

이 프로젝트는 Vercel을 통해 배포되었습니다.

- https://seoly0-coyukdae1.vercel.app/
- https://coyukdae1.seoly.me/

## 개발

실행

```
$ npm run dev
```

빌드

```
$ npm run build
```

## TODO

- 프로젝트 구조 개선
- 디자인 적용
- 적 유형 추가
- 슈팅게임으로 변경
- 모바일 최적화
