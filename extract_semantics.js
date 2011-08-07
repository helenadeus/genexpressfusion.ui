	var basePHP = "http://vmdhcls04.deri.ie/dataFusion/srx2jsonp.php";	
$(document).ready(


	function () {
		var endpoints = $('.sparql');
		
		for (var i=0; i<endpoints.length; i++) {
			
		
			$('#sparql'+(i+1)+'_types').change(
				function () {
					
					var domid = $(this).attr('id').replace('_types', '_props');
					var url = $('#'+$(this).attr('id').replace('_types', '')).val();
					
					var c = $('#'+$(this).attr('id')+' option:selected').val();
					$('#'+domid).html('');
					if(c!=='(no match)'){
						displayProperties(url, c, domid);	
					}
					else {
						$('#'+domid).html('');
					}
				}
			);

		}
	

		$('#queries').change(
			function () {
				var seld = $('#'+$(this).attr('id')+' option:selected').val();
				switch (seld) {
					case 'q1':
					$('#formaction').attr("action", "http://vmdhcls04.deri.ie:8080/exp");	
					var p = "PREFIX gene: <http://www.ebi.ac.uk/efo/EFO_0002606>\nPREFIX affy: <http://bio2rdf.org/ns/affymetrix#>\nPREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n";	
					var q = "SELECT ?gene \nWHERE {	\n?gene        a         gene: .\n} limit 100";
					
					$('#map_gxa').html("PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX gene: <http://www.ebi.ac.uk/efo/EFO_0002606>\nPREFIX affy: <http://bio2rdf.org/ns/affymetrix#>\nPREFIX fn: <http://www.w3.org/2005/xpath-functions#>\nPREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nCONSTRUCT { ?gene  a gene: .}\nWHERE {\n?geneL  a gene: .\n\tBIND(IRI(fn:concat('http://bio2rdf.org/ensembl:', (fn:substring(xsd:string(?geneL), 39)))) as ?gene)\n}");
					
					$('#map_biordf').html('PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX gene: <http://www.ebi.ac.uk/efo/EFO_0002606>\nPREFIX affy: <http://bio2rdf.org/ns/affymetrix#>\nPREFIX fn: <http://www.w3.org/2005/xpath-functions#>\nPREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nCONSTRUCT { ?gene  rdf:type gene: .}\nWHERE {\n ?geneLocal a <http://purl.org/net/biordfmicroarray/ns#gene> ;\n			stat:probe_set_id ?probeid .\n	BIND(IRI(fn:concat("http://bio2rdf.org/affymetrix:", ?probeid)) as ?probeuri)\nSERVICE <http://affymetrix.bio2rdf.org/sparql> {\n	?probeuri affy:xEnsembl ?gene }\n}');
					$('#map_blood').html("");

					break;
					case 'q2':
						$('#formaction').attr("action", "http://vmdhcls04.deri.ie:8080/exp");	
						var p = 'PREFIX experiment: <http://www.ebi.ac.uk/efo/EFO_0004033>\nPREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n';
						var q = 'SELECT * \WHERE {\n	\?experiment        rdf:type         experiment: .\n} limit 100';
						
						$('#map_gxa').html("PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX experiment: <http://www.ebi.ac.uk/efo/EFO_0004033>\nCONSTRUCT { ?experiment a experiment: .}\nWHERE {\n?experiment	a	<http://purl.org/net/biordfmicroarray/ns#microarray_experiment> .\n}");
						$('#map_biordf').html('PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX experiment: <http://www.ebi.ac.uk/efo/EFO_0004033>\nCONSTRUCT { ?experiment a experiment: .}\nWHERE {\n?experiment	a	<http://www.ebi.ac.uk/efo/EFO_0004033> .\n}');
						$('#map_blood').html('PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX experiment: <http://www.ebi.ac.uk/efo/EFO_0004033>\nCONSTRUCT { ?experiment a experiment: .}\nWHERE {\n?experiment	a	<http://mged.sourceforge.net/ontologies/MGEDontology.php#BioAssay> .\n}');
						break;
					
					case 'q3':
						$('#formaction').attr("action", "http://vmdhcls04.deri.ie:8080/exp");	
						var p = 'PREFIX experiment: <http://www.ebi.ac.uk/efo/EFO_0004033>\nPREFIX modelOrganism: <http://purl.obolibrary.org/obo/OBI_0100026>\n';
						var q = 'SELECT * where { \n?experiment a experiment: ;\n	modelOrganism: ?modelOrganism .\n}';

						$('#map_gxa').html("PREFIX experiment: <http://www.ebi.ac.uk/efo/EFO_0004033>\nPREFIX modelOrganism: <http://purl.obolibrary.org/obo/OBI_0100026>\nCONSTRUCT { ?experiment a experiment: \n			modelOrganism: ?modelOrganism .\n}\nWHERE {\n?experiment	a	<http://www.ebi.ac.uk/efo/EFO_0004033> ;\n\tmodelOrganism: ?modelOrganism .\n}");
						$('#map_biordf').html("PREFIX experiment: <http://www.ebi.ac.uk/efo/EFO_0004033>\nPREFIX modelOrganism: <http://purl.obolibrary.org/obo/OBI_0100026>\nCONSTRUCT { ?experiment a experiment: \n			modelOrganism: ?modelOrganism .\n} WHERE {\n\?experiment	a	<http://purl.org/net/biordfmicroarray/ns#microarray_experiment> ;\n\t<http://purl.org/net/biordfmicroarray/ns#modelOrganism>	?modelOrganism .\n}");
						$('#map_blood').html("PREFIX experiment: <http://www.ebi.ac.uk/efo/EFO_0004033>\nPREFIX modelOrganism: <http://purl.obolibrary.org/obo/OBI_0100026>\nCONSTRUCT { ?experiment a experiment: \n			modelOrganism: ?modelOrganism .\n}\nWHERE \n{\n?experiment        a          <http://mged.sourceforge.net/ontologies/MGEDontology.php#BioAssay> ;	\t<http://www.obofoundry.org/ro/ro.owl#has_participant> ?sample .\n	?sample	<http://purl.obolibrary.org/obo/OBI_0000298> ?modelOrganismTaxon .\n}\nSERVICE <http://sparql.obo.neurocommons.org/sparql> {\n?modelOrganismTaxon rdfs:label ?modelOrganism .\n	}\n}");
						
					break;
					case 'q4':
						$('#formaction').attr("action", "http://vmdhcls04.deri.ie:8080/exp");	
						var p = 'PREFIX experiment: <http://www.ebi.ac.uk/efo/EFO_0004033>\nPREFIX modelOrganism: <http://purl.obolibrary.org/obo/OBI_0100026>\nPREFIX result: <http://purl.obolibrary.org/obo/IAO_0000136>\nPREFIX gene: <http://www.ebi.ac.uk/efo/EFO_0002606>\n';
						var q = 'SELECT * WHERE {\n?experiment a experiment: .\n?experiment modelOrganism: ?modelOrganism .\nfilter regex(?modelOrganism, "homo sapiens", "i")\n}\nlimit 100';
						$('#map_gxa').html("PREFIX gene: <http://www.ebi.ac.uk/efo/EFO_0002606>\nPREFIX result: <http://purl.obolibrary.org/obo/IAO_0000136>\nPPREFIX experiment: <http://www.ebi.ac.uk/efo/EFO_0004033>\nPREFIX modelOrganism: <http://purl.obolibrary.org/obo/OBI_0100026>\nCONSTRUCT {\n?experiment a experiment: .\n?experiment modelOrganism: ?modelOrganism .\n}\nWHERE {\n?experiment	a	<http://www.ebi.ac.uk/efo/EFO_0004033> ;\n\tmodelOrganism: ?modelOrganism .\n}");
						$('#map_biordf').html("PREFIX gene: <http://www.ebi.ac.uk/efo/EFO_0002606>\nPREFIX result: <http://purl.obolibrary.org/obo/IAO_0000136>\nPREFIX experiment: <http://www.ebi.ac.uk/efo/EFO_0004033>\nPREFIX modelOrganism: <http://purl.obolibrary.org/obo/OBI_0100026>PREFIX affy: <http://bio2rdf.org/ns/affymetrix#>\nPREFIX fn: <http://www.w3.org/2005/xpath-functions#>\nCONSTRUCT {\n?experiment a experiment: .\n?experiment modelOrganism: ?modelOrganism .\n} WHERE {\n\?experiment	a	<http://purl.org/net/biordfmicroarray/ns#microarray_experiment> ;\n\t<http://purl.org/net/biordfmicroarray/ns#modelOrganism>	?modelOrganism .}");
						$('#map_blood').html("PREFIX gene: <http://www.ebi.ac.uk/efo/EFO_0002606>\nPREFIX result: <http://purl.obolibrary.org/obo/IAO_0000136>\nPREFIX experiment: <http://www.ebi.ac.uk/efo/EFO_0004033>\nPREFIX modelOrganism: <http://purl.obolibrary.org/obo/OBI_0100026>PREFIX affy: <http://bio2rdf.org/ns/affymetrix#>\nPREFIX fn: <http://www.w3.org/2005/xpath-functions#>\nCONSTRUCT {\n?experiment a experiment: .\n?experiment modelOrganism: ?modelOrganism .\n} WHERE {{\n?experiment        a          <http://mged.sourceforge.net/ontologies/MGEDontology.php#BioAssay> ;	\t<http://www.obofoundry.org/ro/ro.owl#has_participant> ?sample .\n	?sample	<http://purl.obolibrary.org/obo/OBI_0000298> ?modelOrganismTaxon .\n}\nSERVICE <http://sparql.obo.neurocommons.org/sparql> {\n?modelOrganismTaxon rdfs:label ?modelOrganism .\n	}\n}");
						break;
					
					case 'q5':
						//omit the service part and send the query directly to gxa
						$('#formaction').attr("action", "http://vmdhcls04.deri.ie:8080/exp");	
						var p = 'PREFIX gene: <http://www.ebi.ac.uk/efo/EFO_0002606>\nPREFIX result: <http://purl.obolibrary.org/obo/IAO_0000136>\nPREFIX platform: <http://purl.obolibrary.org/obo/OBI_0000052>\nPREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX fn: <http://www.w3.org/2005/xpath-functions/>\nPREFIX differential_expression: <http://www.ebi.ac.uk/efo/EFO_0004034>\n';
						var q = 'SELECT (IRI(concat("http://bio2rdf.org/ensembl:", (substr(str(?geneL), 39)))) as ?gene) ?expression WHERE { SERVICE <http://www.ebi.ac.uk/microarray-srv/openrdf-sesame/repositories/gxa> {\n<http://www.ebi.ac.uk/gxa/experiment/E-CBIL-22> result: ?resultSet .\n?resultSet gene: ?geneL .\n?resultSet differential_expression: ?expression .\nFILTER (?expression = "UP" || ?expression = "DOWN")\n}\n}';
						break;
					
					case 'q6':
					//omit the service part and send the query directly to microarray experiments
					$('#formaction').attr("action", "http://vmdhcls04.deri.ie:8080/exp");	
					//$('#formaction').attr("action", "http://hcls.deri.org:8080/openrdf-sesame/repositories/biordfmicroarray")
					var p = 'PREFIX stat: <http://purl.org/net/biordfmicroarray/ns#>\nprefix affy: <http://bio2rdf.org/ns/affymetrix#>\nPREFIX fn: <http://www.w3.org/2005/xpath-functions#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>';
					var q = 'select * where { SERVICE <http://hcls.deri.org:8080/openrdf-sesame/repositories/biordfmicroarray>{\n?geneLocal a <http://purl.org/net/biordfmicroarray/ns#gene> ;\n			stat:probe_set_id ?probeid ;\n			rdfs:label	?geneSymbol .\n}\nBIND(IRI(fn:concat("http://bio2rdf.org/affymetrix:", ?probeid)) as ?probeuri)\n?probeuri affy:xEnsembl ?gene .\n} limit 100';
					break;	
					
					case 'q7':
						var p = 'PREFIX stat: <http://purl.org/net/biordfmicroarray/ns#>\nprefix affy: <http://bio2rdf.org/ns/affymetrix#>\nPREFIX fn: <http://www.w3.org/2005/xpath-functions#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>';
					var q = 'select ?probeid ?geneSymbol ?GO ?gofunction ?chromLoc  where { SERVICE <http://hcls.deri.org:8080/openrdf-sesame/repositories/biordfmicroarray>{\n?geneLocal a <http://purl.org/net/biordfmicroarray/ns#gene> ;\n\tstat:probe_set_id ?probeid ;\n\nrdfs:label	?geneSymbol .\n}\nBIND(IRI(fn:concat("http://bio2rdf.org/affymetrix:", ?probeid)) as ?probeuri)\n.\nservice <http://affymetrix.bio2rdf.org/sparql> {\n?probeuri <http://bio2rdf.org/ns/affymetrix#xGene_Ontology_Molecular_Function> ?GO; <http://bio2rdf.org/ns/affymetrix#Chromosomal_Location> ?chromLoc .\n}\nSERVICE \n<http://go.bio2rdf.org/sparql> {\n?GO <http://purl.org/dc/elements/1.1/title> ?gofunction .\n}\n} limit 100';
						break;
					case 'q8':
					$('#formaction').attr("action", "http://vmdhcls04.deri.ie:8080/exp");	
					//$('#formaction').attr("action", "http://hcls.deri.org:8080/openrdf-sesame/repositories/biordfmicroarray")
					var p = 'PREFIX gene: <http://www.ebi.ac.uk/efo/EFO_0002606>\nPREFIX result: <http://purl.obolibrary.org/obo/IAO_0000136>\nPREFIX differential_expression: <http://www.ebi.ac.uk/efo/EFO_0004034>';

					var q = 'SELECT * WHERE {\nSERVICE <http://www.ebi.ac.uk/microarray-srv/openrdf-sesame/repositories/gxa> {\n?experiment result: ?resultSet .\n?resultSet gene: <http://www.ensembl.org/Gene/Summary?g=ENSMUSG00000037916> .\n?resultSet differential_expression: ?expression .\nFILTER (?expression = "UP")\n}\n}';
					
					break;
						
					
					
					



				
				}
				$('#prefixes').val(p);
				$('#assembledQuery').val(q);
				//console.log(p+q)
				$('#query').val(p+q);
			}
		)

		$('#prefixes').change( function () {
			var p = $('#prefixes').val();
			var q = $('#assembledQuery').val();
			$('#query').val(p+q);
			//console.log(p+q);
		});
		$('#assembledQuery').change( function () {
			var p = $('#prefixes').val();
			var q = $('#assembledQuery').val();
			//console.log(p+q);
			$('#query').val(p+q);
		});
	}

)


var s = 3;var ontologies = {}; var inscall = 0;var totinscall = 0;

var calls = {}

var moreSPARQL = function () {
	var more = '<label for="sparql3">SPARQL endpoint</label>'
				+'<input type="text" id="sparql3" name="sparql2" value="http://bloodprogram.hsci.harvard.edu/sparql"  /><br />';
		
}
var getClasses = function () {
	//while loading, don't show;
	$.mobile.pageLoading();
	
	var query = "select distinct ?class where { [] a ?class } order by desc(?class)";
	var endpoints = $('.sparql');
	if(typeof(calls.types)=='undefined'){calls.types = {};}
	calls.types.total = endpoints.length;
	calls.types.back = 0;
	calls.types.endpoint = {};
	for (var i=0; i<endpoints.length; i++) {
		
		//create select boxes		
		var id = $(endpoints[i]).attr('id');
		
		
		$('#sparql_types').show();
		//what's the url
		var url = $(endpoints[i]).val();
		if(url!==''){
			calls.types.endpoint[escape(url)] = {};

			if(typeof(ontologies[escape(url)])=='undefined'){ ontologies[escape(url)] = {} }

			var totalurl = basePHP+'?url='+escape(url)+'&query='+escape(query)+'&par1='+id+'&par2='+escape(url);
			//console.log(totalurl);
			
			//now the query
			$.getJSON(totalurl+'&callback=?', function (data) {
				calls.types.back++;
					
					//hide loading, show link
					$('#link').show();
					
					
					//parse json
					var decoded = data;var xmlres = decoded[0];
					var domid = decoded[1];
					var url = decoded[2];
					
					if(xmlres==null || typeof(xmlres.results)=='undefined'){
						alert(url+' does not seem to support formatting results as json... :-(');
					}
					else if (xmlres.results.bindings.length==0) {
						alert(url+' returned an empty set of results...not much can be done about that');
					}
					else {
						
					
						calls.types.endpoint[escape(url)] = {total : xmlres.results.bindings.length, back : 0};

						var classes = [];var prettyclasses = [];
						for (var i=0; i< xmlres.results.bindings.length; i++) {
							
							
										
							var classe = xmlres.results.bindings[i].class.value;
							//is this one of those ugly openlink uri? Ignoring...
							if(classe.match("http://www.openlinksw.com/")==null){
								if(typeof(ontologies[escape(url)]['classes'])=='undefined'){ontologies[escape(url)]['classes'] = {};}
								ontologies[escape(url)]['classes'][classe] = {};
								classes.push(classe);
								var tmp = classe.match(/\/([^/]+)$/);
							
								if(tmp){
									var tmp1 = tmp[1].match(/#(.*)$/);
									if(tmp1!==null && tmp1[1]!=''){
										prettyclasses.push(tmp1[1]);	
									}
									else {
										prettyclasses.push(tmp[1]);		
									}
								}

								//lets also collect instance for each of these classes; keep track of the ## of property calls
								var c = classe;
								instancesFromClasses(c, url, domid);
							
							}
						}
						//clean up
						$('#'+domid+'_types').html('');
						selectCreateOptions(domid+'_types', classes, prettyclasses);	
					}
			})
			
			
		}
	}

}

var instancesFromClasses = function(c, url, domid){

	var q = "select distinct ?instance where {?instance a <"+c+"> . } limit 10";
	var totalurl = basePHP+'?url='+escape(url)+'&query='+escape(q)+'&par1='+escape(c)+'&par2='+escape(url)+'&par3='+domid;
	calls.types.endpoint[escape(url)][c] = {total: 0, back : 0};
	//console.log(url+'?query='+escape(q));
	//console.log("http://localhost/geneXpressFusion/"+totalurl);
	$.getJSON(totalurl+'&callback=?', function (data) {
		var decoded = data;var xmlres = decoded[0];
			var c = decoded[1];
			var url = decoded[2];	
			var domid = decoded[3];	
			if(typeof(xmlres)=='undefined' || xmlres==null){
				console.log('no instances for '+c);
			}
			
			else {
				
				var instances = xmlres.results.bindings;
				//calls.types.endpoint[escape(url)].back++; //does not really matter if the endpoint or the class; # of perperty call is the same, depends only on class
				
				//calls.types.endpoint[escape(url)][c].total = properties.length;
				ontologies[escape(url)]['classes'][c].instances = instances;
				if(typeof(instances[0].instance)!=='undefined'){
					
					var firstInst = instances[0].instance.value;
					propertiesFromInstance(firstInst, url, c, domid);
					}
				}
	})
	
	
}

var propertiesFromInstance = function (firstInst, url, c, domid)	{
	//now look for propertis for the first instance; 
	var q =  "select distinct ?property where { <"+firstInst+"> ?property ?o }";
	//console.log(url+'?query='+escape(q))
	//now query
	var totalurl = basePHP+'?url='+escape(url)+'&query='+escape(q)+'&par1='+escape(firstInst)+"&par2="+escape(c)+"&par3="+escape(url)+'&par4='+domid;
	$.getJSON(totalurl+'&callback=?',function (data) {
		var decoded = data;
			var xmlres = decoded[0];
			var instance = decoded[1];
			var c = decoded[2];
			var url = decoded[3];
			var domid = decoded[4];
			var properties = xmlres.results.bindings;
			ontologies[escape(url)]['classes'][c].properties = [];

			for (var i=0; i<xmlres.results.bindings.length; i++) {
				
				var p = xmlres.results.bindings[i].property.value
				ontologies[escape(url)]['classes'][c]['properties'].push(p);
				
			}
	})

	
}

var selectCreateOptions = function(domid, optsVals, optsLabels){
	$('#'+domid).show();
	$('#'+domid).append('<option value="(no match)" selected>Select One</option>')
	for (var i=0; i<optsVals.length; i++) {

		$('#'+domid).append('<option value="'+optsVals[i]+'">'+optsLabels[i]+'</option>')
	}
	//$('#'+domid).append('<option value="(no match)">(no match)</option>')
	
	$('#'+domid).selectmenu("refresh", true);
	$.mobile.pageLoading(true);
					
}
//DOM functs
var matchClasses = function () {
	
	$('#construct').show();
	//find the values selects
	if(!$('#nameVar').val().match(/^[A-Za-z0-9_]+$/)) { 
		$('#varError').html('Plase make sure variable name only contains letter, numbers or underscore.');
	}
	else {
		//$('#construct2') and $('#construct3') are empty? fill; else, append
		var varname = $('#nameVar').val();
		if(varname=='classname'){
			varname = randomString(8);
		}
		$('#nameVar').val(varname);
		varname = '?'+varname;
		
		var endpoints = $('.sparql');
		
		for (var i=1; i<endpoints.length; i++) {
			if($('#construct'+(i+1)).html()==''){
				if($('#sparql'+(i+1)+'_types option:selected').val()!=='(no match)'){
					var mioloC = varname+' a <'+$('#sparql1_types option:selected').val()+'>';
					var template = 'CONSTRUCT { \n'+mioloC+'\n }'; 
					var mioloW = varname+' a <'+$('#sparql'+(i+1)+'_types option:selected').val()+'>';
					var construct2 =  'WHERE { \n'+mioloW+'\n }';
				$('#construct'+(i+1)+'').html(template+'\n'+construct2);
				}
			}
			else {
				//var currentData = $('#construct'+(i+1)).val();
				if($('#sparql'+(i+1)+'_types option:selected').val()!=='(no match)'){
					var temp = varname+' a <'+$('#sparql1_types option:selected').val()+'>'; 
					var c =  varname+' a <'+$('#sparql'+(i+1)+'_types option:selected').val()+'>';
				
				var existingConstr = $('#construct'+(i+1)).val().match(/CONSTRUCT {([^}]+)}/);
				existingWhe = $('#construct'+(i+1)).val().match(/WHERE {([^}]+)}/)
				content = $.trim(existingConstr[1]);
				body = $.trim(existingWhe[1]);
				//does the new template already exist?
				var tmp = content.match(temp.replace('?', '\\?'));
				if(tmp==null){
					var newConst = 'CONSTRUCT { \n '+content+' .\n '+temp+' \n }';
					var newWhe = 'WHERE { \n '+body+' .\n '+c+' \n }';
					$('#construct'+(i+1)).html(newConst+'\n'+newWhe);
				}
				

				
				}
			}

		}
	
			
	}
		
}

var matchProperties = function () {
	$('#construct').show();

	$('#construct').show();
	//find the values selects
	if(!$('#nameProp').val().match(/^[A-Za-z0-9_]+$/)) { 
		$('#varPropError').html('Plase make sure variable name only contains letter, numbers or underscore.');
	}
	else {
		//$('#construct2') and $('#construct3') are empty? fill; else, append
		var varname = $('#nameProp').val();
		if(varname=='propertyname'){
			varname = randomString(8);
		}
		$('#nameProp').val(varname);
		varname = '?'+varname;
		

		var endpoints = $('.sparql');
		
		for (var i=1; i<endpoints.length; i++) {
			if($('#sparql'+(i+1)+'_props option:selected').val()!=='(no match)'){
				var pC = $('#sparql1_props option:selected').val();
				var pO = $('#sparql'+(i+1)+'_props option:selected').val();
				//class
				var classvarname = $('#nameVar').val();
				var cC = $('#sparql1_types option:selected').val();
				var cO = $('#sparql'+(i+1)+'_types option:selected').val();
				var construc = '?'+classvarname+' <'+pC+'> '+varname;
				var where = '?'+classvarname+' <'+pO+'> '+varname;

				//create typing if not there already
				var typingC = '?'+classvarname+' a <'+cC+'>';
				var typingW = '?'+classvarname+' a <'+cO+'>';
				if($('#construct'+(i+1)).html()!==''){
					var existingC = $('#construct'+(i+1)).val().match(/CONSTRUCT {([^}]+)}/);
					var existingW = $('#construct'+(i+1)).val().match(/WHERE {([^}]+)}/)
					var C = $.trim(existingC[1]); 
					var W = $.trim(existingW[1]);
					
					//was typing created?
					var tmp = C.match(typingC.replace('?', '\\?'));

					if(tmp==null){
						var finalC = 'CONSTRUCT { \n '+C+' .\n '+typingC+' .\n '+construc+' \n }';
						var finalW = 'WHERE { \n '+W+' .\n '+typingW+' .\n '+where+' \n }';
					}
					else {
						var finalC = 'CONSTRUCT { \n '+C+' .\n '+construc+' \n }';	
						var finalW = 'WHERE { \n '+W+' .\n '+where+' \n }';	
					}
				
				$('#construct'+(i+1)).html(finalC+'\n'+finalW);

			}
			else {
					var finalC = 'CONSTRUCT { \n '+C+' .\n '+typingC+' .\n '+construc+' \n }';
					var finalW = 'WHERE { \n '+W+' .\n '+typingW+' .\n '+where+' \n }';
					$('#construct'+(i+1)).html(finalC+'\n'+finalW);
			}


		}

		}

	}
	
}
var displayProperties = function (url, c, domid) {
	

	var properties = ontologies[escape(url)]['classes'][c]['properties'];
	var instanceProperties = [];var prettyProperties = [];
		for (var i=0; i<properties.length; i++) {
			var p = properties[i];
		
			instanceProperties.push(p);
			//now for pretty properties;
			var tmp = p.match(/\/([^/]+)$/);

			if(tmp){
				var tmp1 = tmp[1].match(/#(.*)$/);
				if(tmp1!==null && tmp1[1]!=''){
					prettyProperties.push(tmp1[1]);	
				}
				else {
					prettyProperties.push(tmp[1]);		
				}
			}
	}
	
	selectCreateOptions(domid, instanceProperties, prettyProperties);
	
}


function randomString(l) {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	
	var randomstring = '';
	for (var i=0; i<l; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

var executeSPARQL = function () {
	var sparqlServ = 'http://vmdhcls04.deri.ie:8080/sw?media=html&query=';
	var p = $('#prefixes').html().replace(/&lt;/g, '<').replace(/&gt;/g,'>');
	console.log(p);
	var q = escape($('#assembledQuery').html());
	window.open(sparqlServ+p+q);
}
