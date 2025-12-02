// 초기 상태 플래그
let hasSelectedProfile = false;

$('.profile_main').click(function(){
    // 선택창이 열려있는지 확인
    if ($('.btn_add_profile.on').length > 0) {
        // 열려있으면 닫기
        $('.btn_add_profile').removeClass('on');
    } else {
        // 프로필을 한 번이라도 선택했으면 이전에 변경된 프로필들만 열기
        if (hasSelectedProfile) {
            let changedCount = 0;
            
            // person_add가 아닌 이미지(변경된 프로필)만 on 추가
            $('.btn_add_profile').each(function(){
                if (!$(this).find('img').attr('src').includes('person_add')) {
                    $(this).addClass('on');
                    changedCount++;
                }
            });
            
            // 5개 미만이면 다음 add 버튼도 표시
            if (changedCount < 5) {
                $('.btn_add_profile').eq(changedCount).addClass('on');
            }
        } else {
            // 처음이면 첫 번째만 열기
            $('.btn_add_profile').eq(0).addClass('on');
        }
    }
})

$('.btn_add_profile').click(function(){
    const profileImages = [
        "./assets/images/profile/profile1.png",
        "./assets/images/profile/profile2.png",
        "./assets/images/profile/profile3.png",
        "./assets/images/profile/profile4.png",
        "./assets/images/profile/profile5.png"
    ];
    
    let profileIndex = $(this).index();
    let changeImg = $(this).find('img').attr('src');
    let currentMainImg = $('.profile_main .js-profile-img').attr('src');
    
    // 이미 프로필 이미지로 변경된 버튼을 클릭한 경우
    if (!changeImg.includes('person_add')) {
        // 현재 메인 이미지와 같은 프로필을 다시 클릭한 경우 - 프로필 선택창 닫기
        if (changeImg === currentMainImg) {
            $('.btn_add_profile').removeClass('on');
            return;
        }
        
        // 다른 프로필을 클릭한 경우 - 메인 이미지 변경
        $('.profile_main').addClass('is_loading');
        
        setTimeout(() => {
            $('.profile_main .js-profile-img').attr('src', changeImg);
            $('.profile_main').removeClass('is_loading');
        }, 800);
        
        return;
    }
    
    // 버튼 이미지 변경
    $(this).find('img').attr('src', profileImages[profileIndex]);
    
    // 로딩 시작
    $('.profile_main').addClass('is_loading');
    
    // 일정 시간 후 이미지 변경 및 로딩 종료
    setTimeout(() => {
        $('.profile_main .js-profile-img').attr('src', profileImages[profileIndex]);
        $('.profile_main').removeClass('is_loading');
        
        // 프로필 선택 완료 플래그 설정
        hasSelectedProfile = true;
    }, 800);
    
    // 다음 버튼에 on 추가
    $('.btn_add_profile').eq(profileIndex + 1).addClass('on');
});