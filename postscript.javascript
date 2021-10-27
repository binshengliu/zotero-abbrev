if (Translator.BetterBibTeX) {
    // Zotero.debug(JSON.stringify(item))
    // Zotero.debug(JSON.stringify(reference))
    for (const creator of item.creators) {
	if (creator.firstName) {
	    var parts = creator.firstName.split(/\s/).map(x => x[0].concat('.'));
	    creator.firstName = parts.join(' ');
	}
    }
    reference.addCreators();

    var order;
    if (item.itemType === "conferencePaper") {
	order = ["title", "booktitle", "author", "year", "pages"]
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
	    ['Empirical Methods in Natural +Language Processing.*System Demonstrations', 'emnlpdemos'],
	    ['Syntax, Semantics and Structure in Statistical Translation', 'emnlpssst'],
	    ['Empirical Methods in Natural +Language Processing.*Findings', 'emnlpfindings'],
	    ['Findings .* EMNLP', 'emnlpfindings'],
	    ['EMNLP.*BlackboxNLP', 'emnlpblackbox'],
	    ['Empirical Methods in Natural +Language Processing', 'emnlp'],
	    ['Symposium on Applied Computing', 'sac'],
	    ['International Conference on World Wide Web', 'www'],
	    ['World Wide Web Conference', 'www'],
	    ['The Web Conference', 'www'],
	    ['Joint Conference on Digital Librar(y|ies)', 'jcdl'],
	    ['Conference on Computational Natural Language Learning', 'conll'],
	    ['Information Interaction in Context Symposium', 'iiix'],
	    ['ACM Conference on Recommender Systems', 'recsys'],
	    ['Cognitive Computation.*Neural Information Processing Systems', 'nipscoco'],
	    ['International Conference on Neural Information Processing Systems', 'nips'],
	    ['Advances in Neural Information Processing Systems', 'nips'],
	    ['ACM SIGKDD International Conference', 'kdd'],
	    ['Asia-Pacific Chapter of the Association for Computational Linguistics', 'aacl'],
	    ['ACL Workshop BlackboxNLP', 'aclblackbox'],
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
	    ['NTCIR', 'ntcir'],
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
	order = ["title", "journal", "author", "year", "volume", "number", "pages"]
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
	    if (item.publicationTitle && item.publicationTitle.match(re)) {
		reference.add({name: 'journal', bibtex: lookupTable[i][1]})
		break;
	    }
	}
    } else if (item.itemType === "book") {
	order = ["title", "author", "year", "publisher", "address", "isbn", "pages"]
    } else if (item.itemType === "bookSection") {
	order = ["title", "booktitle", "author", "year", "publisher", "address", "isbn", "pages"]
    } else if (item.itemType === "report") {
	order = ["title", "author", "year", "institution", "address"]
    } else if (item.itemType === "document") {
	// misc
	order = ["title", "author", "year"]
    } else if (item.itemType === "webpage") {
	// https://retorque.re/zotero-better-bibtex/exporting/scripting/#add-accessdate-url-for-bibtex
	if (item.accessDate) {
	    reference.add({ name: 'note', value: "(accessed " + item.accessDate.replace(/\s*T?\d+:\d+:\d+.*/, '') + ")" });
	}
	if (item.url) {
	    reference.add({ name: 'howpublished', bibtex: "{\\url{" + reference.enc_verbatim({value: item.url}) + "}}" });
	}
	order = ["title", "note", "howpublished"]
    } else if (item.itemType === "presentation") {
	// misc
	order = ["title", "author", "year"]
    } else if (item.itemType === "thesis") {
	// misc
	order = ["title", "author", "year"]
    } else {
	order = ["title", "author", "year"]
    }

    // Removed extra fields
    for (const [field, value] of Object.keys(reference.has).filter(other => !order.includes(other)).map(f => [f, reference.has[f]])) {
	delete reference.has[field]
    }

    // Reorder
    // https://retorque.re/zotero-better-bibtex/exporting/scripting/
    for (const [field, value] of order.filter(front => reference.has[front]).map(f => [f, reference.has[f]])) {
        delete reference.has[field]
        reference.has[field] = value
    }

    // Zotero.debug(JSON.stringify(reference))
}

// Local Variables:
// mode: js
// End:
