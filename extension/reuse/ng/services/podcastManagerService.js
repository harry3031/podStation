// Angular wrapper for podcastManager on the background

(function() {
	'use strict';

	angular
		.module('podstationInternalReuse')
		.factory('podcastManagerService', ['$q', podcastManagerService]);

	function podcastManagerService($q) {
		var service = {
			getPodcastAndEpisode: getPodcastAndEpisode
		};

		function getPodcastAndEpisode(episodeId) {
			return getBackgroundPage(function(bgPage, deferred) {
				deferred.resolve(bgPage.podcastManager.getPodcastAndEpisode(episodeId));
			});
		}

		return service;

		function getBackgroundPage(callback) {
			var deferred = $q.defer();
			
			chrome.runtime.getBackgroundPage(function(bgPage) {
				callback(bgPage, deferred);
			});

			return deferred.promise;
		}
	}

})();