"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fields = (0, core_1.getInput)('fields').replace(' ', '').split(',');
            const token = (0, core_1.getInput)('token');
            const [owner, repo] = (0, core_1.getInput)('repo').split('/');
            const limit = parseInt((0, core_1.getInput)('limit'));
            const includePrerelease = (0, core_1.getInput)('include_prerelease') === 'true';
            const octokit = (0, github_1.getOctokit)(token);
            const releases = [];
            for (let i = 0; releases.length < limit; i++) {
                const { data } = yield octokit.rest.repos.listReleases({
                    owner,
                    repo,
                    per_page: limit,
                    page: i
                });
                const rawleases = data
                    .filter(r => includePrerelease ? !r.draft : !r.draft && !r.prerelease)
                    .map((r) => {
                    const release = {};
                    for (const field of fields) {
                        release[field] = r[field];
                    }
                    return release;
                });
                releases.push(...rawleases);
            }
            const limitedReleases = releases.slice(0, limit);
            (0, core_1.setOutput)('releases', JSON.stringify(limitedReleases));
        }
        catch (err) {
            (0, core_1.setFailed)(err.message);
        }
    });
}
main();
