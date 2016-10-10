function walk(rootNode)
{
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}

function replaceText(v)
{
    // Fix some misspellings
    v = v.replace(/\b(M|m)illienial(s)?\b/g, "$1illennial$2");
    v = v.replace(/\b(M|m)illenial(s)?\b/g, "$1illennial$2");
    v = v.replace(/\b(M|m)ilennial(s)?\b/g, "$1illennial$2");
    v = v.replace(/\b(M|m)ilenial(s)?\b/g, "$1illennial$2");

    // Millennialism
    v = v.replace(/\bMillennialism\b/g, "Seamanship");
    v = v.replace(/\bmillennialism\b/g, "seamanship");

    //  Gendered Millennials
    v = v.replace(/\bMillennial (M|m)(e|a)n('s)?\b/g, "Sea $1$2n$3");
    v = v.replace(/\bmillennial m(e|a)n('s)?\b/g, "sea m$1n$2");
    v = v.replace(/\bMillennial (B|b)oy('s|s(?:')?)?\b/g, "Sae $1oy$2");
    v = v.replace(/\bmillennial boy('s|s(?:')?)?\b/g, "sea boy$1");
    v = v.replace(/\bMillennial (G|g)uy('s|s(?:')?)?\b/g, "Sea $1uy$2");
    v = v.replace(/\bmillennial guy('s|s(?:')?)?\b/g, "sea guy$1");
    v = v.replace(/\bMillennial (W|w)om(e|a)n('s)?\b/g, "Sea $1om$2n$3");
    v = v.replace(/\bmillennial wom(e|a)n('s)?\b/g, "sea wom$1n$2");
    v = v.replace(/\bMillennial (G|g)irl('s|s(?:')?)?\b/g, "Sea $1irl$2");
    v = v.replace(/\bmillennial girl('s|s(?:')?)?\b/g, "sea girl$1");
    v = v.replace(/\bMillennial (G|g)al('s|s(?:')?)?\b/g, "Sea $1al$2");
    v = v.replace(/\bmillennial gal('s|s(?:')?)?\b/g, "sea gal$1");

    //  Aged Millennials
    v = v.replace(
        /\bMillennial [Tt]een(?:ager)?('s)?\b/g,
        "proto-Sea Person$1"
    );
    v = v.replace(/\bmillennial teen(?:ager)?('s)?\b/g, "proto-sea person$1");
    v = v.replace(
        /\bMillennial [Tt]een(?:ager)?(?:(s)\b(')|s\b)/g,
        "proto-Sea People$2$1"
    );
    v = v.replace(
        /\bmillennial teen(?:ager)?(?:(s)\b(')|s\b)/g,
        "proto-sea people$2$1"
    );
    v = v.replace(/\bMillennial (A|a)dult('s)?\b/g, "$1dult Sea Person$2");
    v = v.replace(/\bmillennial adult('s)?\b/g, "adult sea person$1");
    v = v.replace(
        /\bMillennial (A|a)dult(?:(s)\b(')|s\b)/g,
        "$1dult Sea People$3$2"
    );
    v = v.replace(
        /\bmillennial adult(?:(s)\b(')|s\b)/g,
        "adult sea people$2$1"
    );

    // Definition
    v = v.replace(/\bmil·len·nial\b/g, "sea peo·ple");
    v = v.replace(/\bmiˈlenēəl\b/g, "sē ˈpēpəl");

    // Millennial
    v = v.replace(/\bMillennial\b/g, "Sea Person");
    v = v.replace(/\bmillennial\b/g, "sea person");
    v = v.replace(/\bMillennial(?:(s)\b(')|s\b)/g, "Sea People$2$1");
    v = v.replace(/\bmillennial(?:(s)\b(')|s\b)/g, "sea people$2$1");

    // The Great Recession
    v = v.replace(/\bGreat Recession\b/g, "Fall of the Hittite Empire");
    v = v.replace(/\bgreat recession\b/g, "fall of the Hittite Empire");

    // The Great Depression
    v = v.replace(/\bGreat Depression\b/g, "War with the Egyptians");
    v = v.replace(/\bgreat depression\b/g, "war with the Egyptians");

    return v;
}

// The callback used for the document body and title observers
function observerCallback(mutations) {
    var i;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 3) {
                // Replace the text for text nodes
                handleText(mutation.addedNodes[i]);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(mutation.addedNodes[i]);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);
