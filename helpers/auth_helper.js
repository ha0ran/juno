/********************************************
 *              Helper Functions            *
 ********************************************/
module.exports.loadUser = function (req, res, next) {
    if (req.signedCookies.sessiontoken) {
        authenticateFromSessionToken(req, res, next);
    } else {
        res.redirect('/sessions/new');
    }
}

module.exports.authenticateFromLoginToken = function (req, res, next) {
  var cookie = JSON.parse(req.cookies.logintoken);

  LoginToken.findOne({ email: cookie.email,
                       series: cookie.series,
                       token: cookie.token }, (function(err, token) {
    if (!token) {
      res.redirect('/sessions/new');
      return;
    }

    User.findOne({ email: token.email }, function(err, user) {
      if (user) {
        req.session.user_id = user.id;
        req.currentUser = user;

        token.token = token.randomToken();
        token.save(function() {
          res.cookie('logintoken', token.cookieValue, { expires: new Date(Date.now() + 2 * 604800000), path: '/' });
          next();
        });
      } else {
        res.redirect('/sessions/new');
      }
    });
  }));
}
module.exports.loggedIn = function (request, response, next) {
    console.log(request.session)
    if(request.session.user_id) {
        return true;
    } else {
        return false;
    }
}
