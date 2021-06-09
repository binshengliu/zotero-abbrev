if (Translator.BetterBibTeX) {
    // Zotero.debug(JSON.stringify(item))
    // Zotero.debug(JSON.stringify(reference))
    for (const creator of item.creators) {
	var parts = creator.firstName.split(/\s/).map(x => x[0].concat('.'));
	creator.firstName = parts.join(' ');
    }
    reference.addCreators();

    if (item.itemType === "conferencePaper") {
	var lookupTable = [
	    ['International ACM SIGIR Conference on Research (and|&) Development in Information Retrieval', 'sigir'],
	    ['Proceedings of the .* Conference on Research and Development in Information Retrieval', 'sigir'],
	    ['Proceedings of the .* Conference on Research and Development in Information', 'sigir'],
	    ['International ACM SIGIR Conference', 'sigir'],
	    ['International Conference on Theory of Information Retrieval', 'ictir'],
	    ['Conference on the Theory of Information Retrieval', 'ictir'],
	    ['Conference on Information (and|&) Knowledge Management', 'cikm'],
	    ["Australasian Document Computing Symposium", 'adcs'],
	    ['European Conference on Information Retrieval', 'ecir'],
	    ['International Conference on Web Search and Data Mining', 'wsdm'],
	    ['Design of Experimental Search & Information Retrieval Systems', 'desires'],
	    ['Text Retrieval Conference', 'trec'],
	    ['International Conference on Machine Learning', 'icml'],
	    ['SIGMOD international conference on Management of data', 'sigmod'],
	    ['International Conference on Computational Linguistics', 'coling'],
	    ['Empirical Methods in Natural +Language Processing', 'emnlp'],
	    ['Findings .* EMNLP', '{Proc. Findings@EMNLP}'],
	    ['Symposium on Applied Computing', 'sac'],
	    ['International Conference on World Wide Web', 'www'],
	    ['World Wide Web Conference', 'www'],
	    ['The Web Conference', 'www'],
	    ['Joint Conference on Digital Librar(y|ies)', 'jcdl'],
	    ['Conference on Computational Natural Language Learning', 'conll'],
	    ['Information Interaction in Context Symposium', 'iiix'],
	    ['ACM Conference on Recommender Systems', 'recsys'],
	    ['International Conference on Neural Information Processing Systems', 'nips'],
	    ['Advances in Neural Information Processing Systems', 'nips'],
	    ['ACM SIGKDD International Conference', 'kdd'],
	    ['Annual Meeting .* Association for Computational Linguistics', 'acl'],
	    ['Computer Vision .* Pattern Recognition', 'cvpr'],
	    ['International Conference on Learning Representations', 'iclr'],
	    ['North American .* Association (of|for) Computational Linguistics.* Human Language Technologies', 'naaclhlt'],
	    ['North American .* Association (of|for) Computational Linguistics', 'naacl'],
	    ['International Conference on Data Engineering', 'icde'],
	    ['SIAM International Conference on Data Mining', 'sdm'],
	    ['Conference on Decision and Control', 'cdc'],
	    ['European Chapter .* Association for Computational Linguistics', 'eacl'],
	    ['Human Computation and Crowdsourcing', 'hcomp'],
	    ['Workshop on Human Computation', 'hcomp'],
	    ['Workshop on Neural Machine Translation and Generation', 'wnmt'],
	    ['International Conference on Robotics and Artificial Intelligence', 'icrai'],
	    ['International Conference on Data Mining', 'icdm'],
	    ['Conference on Human Factors in Computing Systems', 'chi'],
	    ['User Interface Software and Technology', 'uist'],
	    ['International Joint Conferences on Artificial Intelligence', 'ijcai'],
	    ['Web Information Systems Engineering', 'wise'],
	    ['AAAI Conference on Artificial Intelligence', 'aaai'],
	]
	// Find available item fields here
	// https://retorque.re/zotero-better-bibtex/exporting/extra-fields/#labelvariable-list
	for (var i = 0; i < lookupTable.length; i++) {
	    var re = new RegExp(lookupTable[i][0], 'i');
	    if (item.publicationTitle && item.publicationTitle.match(re)) {
		reference.add({name: 'booktitle', bibtex: lookupTable[i][1]})
		break;
	    } else if (item.conferenceName && item.conferenceName.match(re)) {
		reference.add({name: 'booktitle', bibtex: lookupTable[i][1]})
		break;
	    }
	}
    } else if (item.itemType === "journalArticle") {
	var lookupTable = [
	    ['Information Retrieval Journal', 'irj'],
	    ['Information Processing .* Management', 'ipm'],
	    ['Journal .* American Society .* Information Science', 'jasist'],
	    ['Foundations and Trends®? in Information Retrieval', 'fntir'],
	    ['Journal of General Internal Medicine', '{J. Gen. Intern. Med.}'],
	    ['ACM Transactions on Information Systems', 'acmtois'], 
	    ['Journal of Machine Learning Research', 'jmlr'],
	    ['Journal of the Royal Statistical Society.* Series C .*Applied Statistics.*', '{J. R. Stat. Soc. Ser. C Appl. Stat.}'],
	    ['^Neural Computation$', '{Neural Comput.}'],
	    ['Transactions of the Association for Computational Linguistics', '{ Trans. Assoc. Comput. Linguistics}'],
	    ['IEEE Transactions on Neural Networks and Learning Systems', '{IEEE Trans. Neural Networks Learn. Syst.}'],
	    ['Journal of General Internal Medicine', '{J. Gen. Intern. Med.}'],
	    ['^Machine Learning$', '{Mach. Learn.}'],
	]
	for (var i = 0; i < lookupTable.length; i++) {
	    var re = new RegExp(lookupTable[i][0], 'i');
	    if (item.publicationTitle.match(re)) {
		reference.add({name: 'journal', bibtex: lookupTable[i][1]})
		break;
	    }
	}
    }
}
