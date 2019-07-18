var assert = require("assert");
var ePub = require('../src/epub');

describe("section", function() {
        it("finds a single result in a section", function() {
                var book = ePub("./fixtures/alice/", {width: 400, height: 400});
                return book.ready.then(function() {
                        var section = book.section("chapter_001.xhtml");
                        return section.load().then(function() {
                                var results = section.find("they were filled with cupboards and book-shelves");
                                assert.equal(results.length, 1);
                                assert.equal(results[0].cfi, "epubcfi(/6/8[chapter_001]!/4/2/16,/1:275,/1:323)");
                                assert.equal(results[0].excerpt, "... see anything; then she looked at the sides of the well and\n\t\tnoticed that they were filled with cupboards and book-shelves; here and there she saw\n\t\t...");
                        });
                });
        });

        it("finds multiple results in a section", function() {
                var book = ePub("./fixtures/alice/", {width: 400, height: 400});
                return book.ready.then(function() {
                        var section = book.section("chapter_001.xhtml");
                        return section.load().then(function() {
                                var results = section.find("white rabbit");
                                assert.equal(results.length, 2);
                                assert.equal(results[0].cfi, "epubcfi(/6/8[chapter_001]!/4/2/8,/1:240,/1:252)");
                                assert.equal(results[0].excerpt, "...e worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her....");
                                assert.equal(results[1].cfi, "epubcfi(/6/8[chapter_001]!/4/2/20,/1:148,/1:160)");
                                assert.equal(results[1].excerpt, "...ut it was\n\t\tall dark overhead; before her was another long passage and the White Rabbit was still\n\t\tin sight, hurrying down it. There was not a moment...");
                       });
                });
        });

        it("finds result that spanning multiple document nodes, tag at beginning", function() {
                var book = ePub("./fixtures/alice/", {width: 400, height: 400});
                return book.ready.then(function() {
                        // <p>"Oh, I <i>beg</i> your pardon!" she exclaimed in a tone of great dismay. </p>
                        var section = book.section("chapter_010.xhtml");
                        return section.load().then(function() {
                                var results = section.find("beg your pardon");
                                assert.equal(results.length, 1);
                                assert.equal(results[0].cfi, "epubcfi(/6/26[chapter_010]!/4/2/6,/2/1:0,/3:12)");
                                assert.equal(results[0].excerpt,'beg your pardon!" she exclaimed in a tone of great dismay.');
                        });
                });
        });

        it("finds result that spanning multiple document nodes, tag at ending", function() {
                var book = ePub("./fixtures/alice/", {width: 400, height: 400});
                return book.ready.then(function() {
                        var section = book.section("chapter_010.xhtml");
                        return section.load().then(function() {
                                var results = section.find("I beg");
                                assert.equal(results.length, 1);
                                assert.equal(results[0].cfi, "epubcfi(/6/26[chapter_010]!/4/2/6,/1:5,/2/1:3)");
                                assert.equal(results[0].excerpt,'"Oh, I beg');
                        });
                });
        });

        it("finds result that spanning multiple document nodes, tag at middle", function() {
                var book = ePub("./fixtures/alice/", {width: 400, height: 400});
                return book.ready.then(function() {
                        var section = book.section("chapter_010.xhtml");
                        return section.load().then(function() {
                                var results = section.find("I beg your pardon");
                                assert.equal(results.length, 1);
                                assert.equal(results[0].cfi, "epubcfi(/6/26[chapter_010]!/4/2/6,/1:5,/3:12)");
                                assert.equal(results[0].excerpt,'"Oh, I beg your pardon!" she exclaimed in a tone of great dismay.');
                        });
                });
        });
});
