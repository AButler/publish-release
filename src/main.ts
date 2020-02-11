import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    let release_id: number = 0;
    let release_tag: string;
    let draft: boolean = false;
    const repo = github.context.repo;
    const tag = core.getInput( 'release-tag' );
    const token = core.getInput( 'repo-token', { required: true } );
    const octokit = new github.GitHub( token );
    
    if ( tag ) {
      core.debug( `Getting release id for ${tag}...` );
      const release = await octokit.repos.getReleaseByTag( { ...repo, tag } );
      
      release_id = release.data.id;
      draft = release.data.draft;
      release_tag = release.data.tag_name;
    } else {
      const action = github.context.payload.action;

      switch ( action ) {
        case 'published':
        case 'created':
        case 'prereleased':
          break;
        default:
          // Stop if not correct state, but do not fail
          core.warning( `Cannot publish a release which is being ${action}` )
          return;
      }

      release_id = github.context.payload.release.id;
      draft = github.context.payload.release.draft;
      release_tag = github.context.payload.release.tag_name;
    }

    if ( !release_id ) {
      core.setFailed( 'Could not find release' );
      return;
    }

    if( !draft ) {
      core.warning( `Release ${release_tag} has already been published!` );
      return;
    }

    console.log( `Publishing release ${release_tag} (${release_id})...` );
    octokit.repos.updateRelease( { ...repo, release_id, draft: false } );
    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
