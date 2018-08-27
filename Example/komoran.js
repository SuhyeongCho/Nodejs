let koalanlp = require('koalanlp'); // Import
let API = koalanlp.API; // Tagger/Parser Package 지정을 위한 목록
let POS = koalanlp.POS; // 품사 관련 utility

koalanlp.initialize({
    packages: [API.EUNJEON, // 품사분석(POS Tagging)을 위해서, 은전한닢 사용
               API.KKMA], // 의존구문분석(Dependency Parsing)을 위해서, 꼬꼬마 사용
    version: "1.9.2", // 사용하는 KoalaNLP 버전 (1.9.2 사용)
    javaOptions: ["-Xmx4g"],
    debug: true // Debug output 출력여부
}).then(function(){
    // 품사분석기 이용법
    let tagger = new koalanlp.Tagger(API.EUNJEON);

    // POS Tagging
    tagger.tag("안녕하세요. 눈이 오는 설날 아침입니다.")
        .catch(function(error){
            console.error(error);
        }).then(function(taggedAsync){
            console.log("Async", taggedAsync.result.map(s => s.toString()).join("\n"));
        });

    // 의존구문분석기 이용법
    let parser = new koalanlp.Parser(API.KKMA, API.EUNJEON);

    // Dependency Parsing
    parser.parse("안녕하세요. 눈이 오는 설날 아침입니다.")
        .catch(function(error){
            console.error(error);
        }).then(function(parsed){
            console.log("Async", parsed.result.map(s => s.toString()).join("\n"));

            // Data classes
            let sentence = parsed[1]; // 두번째 문장인, "눈이 오는 설날 아침입니다."를 선택합니다.

            let wordAt0 = sentence.get(0); // 첫번째 어절을 선택해봅니다.
            console.log(wordAt0.exists(m => POS.isPredicate(m.tag))); // 첫번째 어절에, 용언(동사/형용사)을 포함한 형태소가 있는지 확인합니다.
            console.log(sentence.exists(w => w.exists(m => POS.isNoun(m.tag)))); // 문장 전체에 체언(명사 등)을 포함한 어절이 있는지 확인합니다.
            console.log(sentence.nouns()); // 문장에서 체언만 추출합니다.
            console.log(sentence.verbs()); // 문장에서 용언만 추출합니다.
        });
});
