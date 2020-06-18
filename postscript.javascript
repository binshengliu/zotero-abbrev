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
	    ['Proceedings of the .* International Conference on Research and Development in Information Retrieval', 'sigir'],
	    ['Proceedings of the 34th International ACM SIGIR Conference on Research and Development in Information', 'sigir'],
	    ['SIGIR International Conference on Theory of Information Retrieval', 'ictir'],
	    ['Conference on the Theory of Information Retrieval', 'ictir'],
	    ['Conference on Information and Knowledge Management', 'cikm'],
	    ["Australasian Document Computing Symposium", 'adcs'],
	    ['European Conference on Information Retrieval', 'ecir'],
	    ['International Conference on Web Search and Data Mining', 'wsdm'],
	    ['Design of Experimental Search & Information Retrieval Systems', 'desires'],
	    ['Text Retrieval Conference', 'trec'],
	    ['International Conference on Machine Learning', 'icml'],
	    ['SIGMOD international conference on Management of data', 'sigmod'],
	    ['International Conference on Computational Linguistics', 'coling'],
	    ['Empirical Methods in Natural +Language Processing', 'emnlp'],
	    ['Symposium on Applied Computing', 'sac'],
	    ['International Conference on World Wide Web', 'www'],
	    ['Joint Conference on Digital Librar(y|ies)', 'jcdl'],
	    ['Conference on Computational Natural Language Learning', 'conll'],
	    ['Information Interaction in Context Symposium', 'iiix'],
	    ['ACM Conference on Recommender Systems', 'recsys'],
	    ['International Conference on Neural Information Processing Systems', 'nips'],
	]
	for (var i = 0; i < lookupTable.length; i++) {
	    var re = new RegExp(lookupTable[i][0], 'i');
	    if (item.publicationTitle.match(re)) {
		reference.add({name: 'booktitle', bibtex: lookupTable[i][1]})
		break;
	    }
	}
    } else if (item.itemType === "journalArticle") {
	var lookupTable = [
	    ['Information Retrieval Journal', 'irj'],
	    ['Information Processing and Management', 'ipm'],
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
